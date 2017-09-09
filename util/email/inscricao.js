"use strict";
const mjml = require("mjml");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const config = require("../../config/database");
const Usuario = require("../../models/usuario");
const Empresa = require("../../models/empresa");
const Usuarioconvidar = require("../../models/usuarioconvidar");
const email = require("../../config/email");
const database = require("../../config/database");

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
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: email.user,
      pass: email.pass
    }
  });
  let subject = this.getSubject(empresa, usuario);
  const {
    html,
    errors
  } = mjml.mjml2html(this.getHtml(empresa, usuario, acessopagina), {
    beautify: true,
    minify: true,
    level: "soft"
  });
    
  var text = this.getText(empresa, usuario, acessopagina);
  //TODO: mudar o TO para o usuário
  transporter.sendMail({
    from: "yucar <" + email.user + ">",
    to: "andlbp@gmail.com",
    subject: subject,
    text: text,
    html: html
  },(err,info) =>{
    if (err) {
      console.log(err);
    }
    if (info) {
      console.log(info);
    }
  });
};

exports.getSubject = (empresa, usuario) => {
  return (
    empresa.nomefantasia +
    " gostaria de convidar você a fazer parte do portal yucar"
  );
};

exports.getText = (empresa, usuario, acessopagina) => {
  //TODO: colocar o endereço de acesso ao portal
  let retorno =
    "Olá " +
    usuario.nome +
    `.<br> <br>A YUCAR é uma startup que facilitará o acesso aos serviços realizados em seu carro.
    <br><br> Em parceria com `
    +empresa.nomefantasia+
    `, você terá  todos os serviços realizados em seu veiculo disponíveis on-line. 
    <br>Receberá alertas para lembrá-lo das manutenções periódicas e promoções.
    <br>Crie sua conta em nosso portal clicando no botão abaixo.<br>
    `
  return retorno;
};

exports.getHtml = (empresa, usuario, acessopagina) => {
  var tMjml = `
  <mjml>
    <mj-body>
      <mj-container>
        <mj-section background-color="#f0f0f0">
          <mj-column>
            <mj-text font-style="italic" font-size="20" color="#626262">
              YUCAR e ` + empresa.nomefantasia + `
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section background-color="#fafafa">
          <mj-column width="400">
            <mj-text color="#525252" align="center">
            ` + this.getText(empresa, usuario, acessopagina) + `
            </mj-text>
            <mj-button background-color="#F45E43" href="`+acessopagina+`">Crie sua conta</mj-button>      
          </mj-column>
        </mj-section>
      </mj-container>      
    </mj-body>
  </mjml>`
  return tMjml;
};

