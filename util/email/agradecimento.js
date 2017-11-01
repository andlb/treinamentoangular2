"use strict";
const express = require('express');
const app = express();

const mjml = require("mjml");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const numeral = require('numeral');

const config = require("../../config/database")[app.get('env')];
const Usuario = require("../../models/usuario");
const Empresa = require("../../models/empresa");
const Ordemservico = require("../../models/ordemservico");
const Usuarioconvidar = require("../../models/usuarioconvidar");
const Servicorealizado = require("../../models/servicorealizado");
const Configuration = require("../../models/configuration");


exports.enviaragradecimento = ordemservicoid => {

  Ordemservico.findById(ordemservicoid)
    .populate("veiculoid usuarioid empresaid")
    .exec((err, oOrdemservico) => {      
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }
      Servicorealizado.find({
        ordemservicoid: ordemservicoid
      })
      .populate('servicoid')
      .exec((err, oServicosrealizados) => {
        if (err) {
          console.log(err.code + " - " + err.message);
          process.exit(0);
        }
        this.envioEmail(oOrdemservico, oServicosrealizados);
      });
    });
};

exports.envioEmail = (ordemservico, servicorealizados) => {
  let usuario = ordemservico.usuarioid;
  let empresa = ordemservico.empresaid;
  let token = jwt.sign(
    {
      userId: usuario._id,
      email: usuario.email
    },
    config.segredoemail,
    {
      expiresIn: "15 days"
    }
  );
  let acessopagina ='';
  if (!usuario.cadastrado) {    
    acessopagina = config.acesso + "/register?tk=" + token + "&email=" + usuario.email;
  }else{
    acessopagina =config.acesso + "/login"
  }
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
    let subject = this.getSubject(empresa, usuario);
    const { html, errors } = mjml.mjml2html(
      this.getHtml(servicorealizados, ordemservico, acessopagina),
      {
        beautify: true,
        minify: true,
        level: "soft"
      }
    );
    let toEmail = usuario.email + ',youkarservice@gmail.com' 
    if (app.get('env') !== "production") {
      toEmail = "andlbp@hotmail.com"
    }    
    transporter.sendMail(
      {
        from: empresa.nomefantasia + " <" + decode.email + ">",
        to: toEmail,
        subject: subject,      
        html: html
      },
      (err, info) => {
        if (err) {
          console.log(err);
        }
        if (info) {        
          console.log(info);
          info.tipo="agradecimento";  
          usuario.emailenviado.push(info);
          usuario.save();
        }
      }
    );  
  });
};

exports.getSubject = (empresa, usuario) => {
  return  empresa.nomefantasia + ' agradece sua visita. Quer conhecer nosso novo serviço? ';

  
};

exports.getHtml = (servicorealizados, ordemservico, acessopagina) => {
  let empresa = ordemservico.empresaid;
  let usuario = ordemservico.usuarioid;
  let veiculo = ordemservico.veiculoid;

  let mensagemCliente = '';
  let textoBotao = ''
  mensagemCliente =     `<br> Sobre nós: <br> A YOUKAR em parceria com ` +
    empresa.nomefantasia +
    ` tem o objetivo de disponibilizar na internet os serviços realizados em seu veículo e armazenar os dados do seu veículo na sua conta na Internet. <br>`

  if (!usuario.cadastrado) {
    mensagemCliente += `Para ter acesso se cadastre no nosso portal através do botão abaixo.`              
    textoBotao = 'Crie sua conta'
  }else{
    mensagemCliente += `Para ter acesso clique no botão abaixo.`              
    textoBotao = 'Acesse sua conta'
  }

  var tColumns = "";
  for (var servicorealizado of servicorealizados) {
    var proximaDataTroca = "Não definido";
    if (servicorealizado.proximatrocadata){
      proximaDataTroca = moment(servicorealizado.proximatrocadata, moment.ISO_8601);        
      proximaDataTroca = proximaDataTroca.format("DD/MM/YYYY");
    }  
    var proximaTroca = "Não definido";
    if (servicorealizado.proximatrocakm) {      
      proximaTroca = numeral(servicorealizado.proximatrocakm).format('0,0')
    }
    let descricaoservico = "<strong>"+servicorealizado.servicoid.descricao+"</strong>";    
    if (servicorealizado.observacao) {
      descricaoservico += " <br/> " + servicorealizado.observacao
    }
    tColumns += 
      `
              <tr>
                <td width='40%' style="text-align:left;font-family:'Raleway';font-weight:400;">` +
                  descricaoservico +
                `</td>
                 <td width='35%' style="text-align:left;font-family:'Raleway';font-weight:400;">` +
      proximaDataTroca
       +
      `</td>
                <td width='25%' style="text-align:right;font-family:'Raleway';font-weight:400;">` +
      proximaTroca +
      `</td>
              </tr>
          `;
  }
  var tMjml =
    `
  <mjml>
  <mj-head>
  <mj-font name="Raleway" href="https://fonts.googleapis.com/css?family=Raleway:400,600,700" />
  <mj-font name="Lora" href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i" />
  <mj-style inline="inline">
    .quebratexto {          
      word-break: break-all;
    }
  </mj-style>
</mj-head>  
    <mj-body>
      <mj-container>
        <!-- Company Header -->
        <mj-section padding-bottom="0" background-color="#fcfcfc">
        <mj-column width="100%">
          <mj-text align="center" font-size="20" color="grey" font-family="Raleway" font-weight="700">
            ` +
    empresa.nomefantasia +
    ` agradece sua visita.
          </mj-text>
          <mj-divider horizontal-spacing="0" vertical-spacing="0" padding-top="20" padding-bottom="0" padding-left="0" padding-right="0" border-width="1px" border-color="#f8f8f8" />
        </mj-column>
      </mj-section>
      <!-- Article -->
      <mj-section background-color="white">
        <mj-column width="100%">
          <mj-text align="left" font-size="14" font-family="Lora" font-weight="400">
            Olá `+ordemservico.usuarioid.nome+`, você poderia nos ajudar? <br>
            Nós gostariamos de criar uma 
            aplicação para armazenar os dados do serviço 
            realizado em seu veículo na sua conta na Internet. </br>
            Dessa forma, quando você for 
            vender o seu veículo, você poderá disponibilizar para comprador 
            todos as manutenções realizadas.
            Está interessado? Então clique no botão abaixo para se cadastrar.
          </mj-text>
          <mj-button background-color="#F45E43" href="` 
          +acessopagina +
          `">
          `+ textoBotao +`
          </mj-button>                                 
        </mj-column>
      </mj-section> 
      <mj-section background-color="#fafafa">
        <mj-column width="100%">
          <mj-text color="#525252" align="left" font-size="14" font-family="Lora" font-weight="400">
            Alguns servidores de e-mail bloqueiam o botão.
            </br>
              Por isso, caso não seja possível clicar no botão, copie o texto abaixo e cole na url do seu browser:
            </br>
            <p class="quebratexto">`+acessopagina+`</p>
          </mj-text>
        </mj-column>
      </mj-section>
   
      <mj-section>
        <mj-column>
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />
        </mj-column>
      </mj-section>      
      <mj-section background-color="#e6e6ff">      
        <mj-column>
          <mj-text align="center" 
          font-size="20" 
          color="grey" font-family="Raleway" font-weight="700">          
            Lista dos serviços realizados            
            </mj-text>

          <mj-text align="center" 
          font-size="14" 
          color="grey" font-family="Raleway" font-weight="400">          
            
                    
            <span style="font-weight:bold;">
            Placa:</span>
            
            `+veiculo.placa+`
            <span style="padding-left:80px; font-weight:bold;">
            Km: </span>            
            `+numeral(ordemservico.quilometragem).format('0,0')+
            ` </span>
          </mj-text>        
        </mj-column>
      </mj-section>      

      <mj-section>
          <mj-column>
            <mj-table>
              <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                <th width='40%' style="text-align:left;font-family:'Raleway';font-weight:700" >Serviço</th>
                <th width='35%' style="text-align:left;font-family:'Raleway';font-weight:700" >Data próx. manut.</th>
                <th width='25%' style="text-align:right;font-family:'Raleway';font-weight:700">KM próx. manut.</th>
              </tr>      
              ` + tColumns +      `
              </mj-table>
            </mj-column>
        </mj-section>
    </mj-body>
  </mjml>
  `;
  return tMjml;
};

