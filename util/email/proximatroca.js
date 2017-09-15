"use strict";

const mjml = require("mjml");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");
const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Servico = require("../models/servico");
const Servicorealizado = require("../models/servicorealizado");
const moment = require("moment");

try {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.uri, err => {
    Empresa.find({}, (err, empresas) => {
      console.log(empresas);
      for (var cEmpresa = 0; cEmpresa < empresas.length; cEmpresa++) {
        let oEmpresa = empresas[cEmpresa];
        enviaEmail(oEmpresa);
      }
    });

    return;
  });
} catch (e) {
  if (e.getMessages) {
    console.log(e.getMessages());
  } else {
    throw e;
  }
}

function enviaEmail(oEmpresa) {
  Ordemservico.findOne({
      empresaid: oEmpresa._id
    },
    (err, oOrdemServico) => {
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }

      if (!oOrdemServico) {
        console.log("Ordem de serviço não encontrada");
        process.exit(0);
      }
      Servicorealizado.find({
          ordemservicoid: oOrdemServico._id
        })
        .populate("ordemservicoid veiculoid servicoid empresaid")
        .exec((err, servicorealizados) => {
          if (err) {
            console.log(err.code + " - " + err.message);
            process.exit(0);
          }
          if (servicorealizados) {
            const {
              html,
              errors
            } = mjml.mjml2html(getHtml(servicorealizados, oEmpresa), {
              beautify: true,
              minify: true,
              level: "soft"
            });

            if (errors) {
              console.log(errors.map(e => e.formattedMessage).join("\n"));
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

              var subject = oEmpresa.nomefantasia + ' - lembrando os serviços a ser realizado' 
              if (err) {
                console.log("could not connect to database", err);
              } else {
                transporter.sendMail({
                  from: "youcar <"+email.user+">",
                  to: "andlbp@gmail.com",
                  subject: subject,
                  text: "texto da mensagem enviada",
                  html: html
                });
              }            
            });
         }        
      });
    }
  );
}

function getHtml(servicorealizados, empresa) {
  var tColumns = "";
  for (var servicorealizado of servicorealizados) {
    var proximaDataTroca = moment(
      servicorealizado.ordemservicoid.data,
      moment.ISO_8601
    ).add(servicorealizado.servicoid.tempo, "month");
    var proximaTroca =
      parseFloat(servicorealizado.ordemservicoid.quilometragem) +
      parseFloat(servicorealizado.servicoid.quilometragem);
    servicorealizado.servicoid.proximaTroca = proximaTroca;

    tColumns +=
      `
            <tr>
              <td width='40%' style="text-align:left;">` +
                servicorealizado.servicoid.descricao +
              `</td>
               <td width='35%' style="text-align:left;">` +
                proximaDataTroca.format('DD/MM/YYYY') +
              `</td>
              <td width='25%' style="text-align:right;">` +
                proximaTroca +
              `</td>
            </tr>
        `;
  }
  var tMjml =
    `
<mjml>
  <mj-body>
    <mj-container>

      <!-- Company Header -->
      <mj-section background-color="#f0f0f0">
        <mj-column>
          <mj-text font-style="italic" font-size="20" color="#626262">
            YOUCAR
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- Intro text -->
      <mj-section background-color="#fafafa">
        <mj-column width="400">
          <mj-text font-style="italic" font-size="20" font-family="Helvetica Neue" color="#626262">Andre Luis</mj-text>
          <mj-text color="#525252">
              Nós da ` + empresa.nomefantasia + ` estamos enviando esse e-mail para lembrar os próximos serviços a ser realizado
          </mj-text>
          <mj-button background-color="#F45E43" href="#">Acesse sua conta</mj-button>
        </mj-column>
      </mj-section>
      <!-- Side image -->

      <mj-section>
      <mj-column>
        <mj-table>
          <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
            <th width='40%' style="text-align:left;" >Serviço</th>
            <th width='35%' style="text-align:left;" >Data próx. troca</th>
            <th width='25%' style="text-align:right;">KM próx. troca</th>
          </tr>      
          ` + tColumns + `
          </mj-table>
        </mj-column>
      </mj-section>
  </mj-body>
</mjml>
`;
  return tMjml;
}

//
// import { mjml2html } from 'mjml'
// const fs = require('fs');

//console.log(htmlOutput)
/*
var transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:'andlbp@gmail.com',
    pass:'%Andre@1234'
  }
});
console.log('criado');
fs.readFile('teste.log',(err,data)=>{
  if (err) {
    console.log(err);
    return;
    
  }
  transporter.sendMail({
    from:'youcar <andlbp@gmail.com>',
    to:'andlbp@gmail.com',
    subject:'Enviando e-mail utilizando o NODE.JS',
    text:'texto da mensagem enviada',
    html:getHtml(),
    attachments:[{'filename':'teste.log','content':data}]
  })
});

function getHtml(){
    return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Angular 2</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
      <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
      <div class="container">
        <div class="page-header">
          <h1>List groups</h1>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <ul class="list-group">
              <li class="list-group-item">Cras justo odio</li>
              <li class="list-group-item">Dapibus ac facilisis in</li>
              <li class="list-group-item">Morbi leo risus</li>
              <li class="list-group-item">Porta ac consectetur ac</li>
              <li class="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
      </div>
    </body>
    </html>
    
    `;
}
*/