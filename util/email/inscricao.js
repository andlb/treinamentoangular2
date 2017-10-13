"use strict";
const express = require('express');
const app = express();

const mjml = require("mjml");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const config = require("../../config/database")[app.get('env')];
const Usuario = require("../../models/usuario");
const Empresa = require("../../models/empresa");
const Usuarioconvidar = require("../../models/usuarioconvidar");
const database = require("../../config/database")[app.get('env')];
const Configuration = require("../../models/configuration");

exports.enviarConvite = (usuarioconvidarid) => {
  Usuarioconvidar.findById({ _id: usuarioconvidarid })
  .populate("usuarioid empresaid")
  .exec((err, usuarioconvidar) => {
    
    if (err) {
      console.log(err.code + ' - ' + err.message);
      return;
    }
    if (!usuarioconvidar) {
      console.log('Usuário não encontrado');
      return;
    }
    let cont = 0;    
    let oUsuario = usuarioconvidar.usuarioid;
    cont++;
    if (cont > 3) {
      return;
    }
    let dataProximoEnvio = moment(Date.now()).add(7, "days");
    usuarioconvidar.dataultimoenvio = Date.now();
    usuarioconvidar.dataproximoenvio = dataProximoEnvio;
    usuarioconvidar.save();          
    this.envioEmail(usuarioconvidar.empresaid, usuarioconvidar.usuarioid);    
  });
}

exports.enviarVarios = () => {
  let dataProximoEnvio = moment(Date.now()).add(7, "days");
  mongoose.Promise = global.Promise;
  mongoose.connect(config.uri, err => {
    if (err) {
      process.exit(0);
    }
    Usuarioconvidar.find({ dataproximoenvio: { $lt: Date.now() } })
      .populate("usuarioid empresaid")
      .exec((err, usuariosconvidar) => {
        if (err) {
          process.exit(0);
        }
        if (!usuariosconvidar) {
          process.exit(0);
        }
        let cont = 0;
        for (let usuarioconvidar of usuariosconvidar) {
          let oUsuario = usuarioconvidar.usuarioid;
          cont++;
          if (cont > 3) {
            return;
          }
          usuarioconvidar.dataultimoenvio = Date.now();
          usuarioconvidar.dataproximoenvio = dataProximoEnvio;
          usuarioconvidar.save();          
          this.envioEmail(usuarioconvidar.empresaid, usuarioconvidar.usuarioid);
        }
      });
  });
};



exports.envioEmail = (empresa, usuario) => {
  let token = jwt.sign(
    {
      userId: usuario._id,
      email: usuario.email
    },
    database.segredoemail,
    {
      expiresIn: "15 days"
    }
  );

  let acessopagina = database.acesso + "/register?tk=" + token+'&email='+usuario.email;
  let subject = this.getSubject(empresa, usuario);
  let text = this.getText(empresa, usuario, acessopagina);
  Configuration.findOne({}, (err,data) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!data){
      console.log("dados sobre o envio do e-mail não encontrado.");
      return;
    }
    let decode = jwt.verify(data.emailtoken, data.emailsecret);    
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: decode.email,
        pass: decode.pass
      }
    }); 
    const {
      html,
      errors
    } = mjml.mjml2html(this.getHtml(empresa, usuario, acessopagina), {
      beautify: true,
      minify: true,
      level: "soft"
    });
    //TODO: mudar o TO para o usuário
    let toEmail = usuario.email + ',youkarservice@gmail.com' 
    if (app.get('env') !== "production") {
      toEmail = "andlbp@hotmail.com"
    }    
    transporter.sendMail({      
      from: empresa.nomefantasia + " <" + decode.email + ">",
      to: toEmail,
      subject: subject,
      text: text,
      html: html
    },(err,info) =>{
      if (err) {
        console.log(err);
      }
      if (info) {
        info.tipo="inscricao";  
        usuario.emailenviado.push(info);
        usuario.save();
      }
    });
  });
};

exports.getSubject = (empresa, usuario) => {
  return (
    empresa.nomefantasia +
    " gostaria de convidá-lo a fazer parte do portal YouKar"
  );
};

exports.getText = (empresa, usuario, acessopagina) => {  
  let retorno =
    `A YouKar é um portal onde os proprietários de veículos encontrarão informações 
    sobre seus veículos, dicas para reduzir o custo das manutenções e 
    para aumenta o preço de venda do seu veiculo além de conselhos para manter a 
    segurança sua e de sua família.`
  return retorno;
};

exports.getHtml = (empresa, usuario, acessopagina) => {
  var tMjml = `
  <mjml>
    <mj-head>
      <mj-style inline="inline">
        .quebratexto {          
          word-break: break-all;
        }
      </mj-style>
    </mj-head>
    <mj-body>
      <mj-container>
        <mj-section background-color="#fafafa">
          <mj-column width="100%">
            <mj-text color="#525252" align="center">
            ` + this.getText(empresa, usuario, acessopagina) + `
            </mj-text>
            <mj-button background-color="#F45E43" href="`+acessopagina+`">
            Crie sua conta
            </mj-button>      
          </mj-column>
        </mj-section>
        <mj-section background-color="#fafafa">
          <mj-column width="100%">
            <mj-text color="#525252" align="left">
              Alguns servidores de e-mail bloqueiam o botão.
              </br>
                Por isso, caso não seja possivel clicar no botão, copie o texto abaixo e cole na url do seu browser:
              </br>
              <p class="quebratexto">`+acessopagina+`</p>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-container>      
    </mj-body>
  </mjml>`
  return tMjml;
};

