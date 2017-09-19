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
  
    //var text = this.getText(empresa, usuario);
    //TODO: mudar o TO para o usuário
    transporter.sendMail(
      {
        from: empresa.nomefantasia + " <" + decode.email + ">",
        to: "andlbp@gmail.com",
        subject: subject,      
        html: html
      },
      (err, info) => {
        if (err) {
          console.log(err);
        }
        if (info) {
          console.log(info);
        }
      }
    );  
  });
};

exports.getSubject = (empresa, usuario) => {
  return " Agradecemos por realizar o servico conosco. Seja sempre bem vindo.";
};

exports.getHtml = (servicorealizados, ordemservico, acessopagina) => {
  let empresa = ordemservico.empresaid;
  let usuario = ordemservico.usuarioid;
  let mensagemCliente = '';
  let textoBotao = ''
  if (!usuario.cadastrado) {
    mensagemCliente = `A YOUKAR em parceria com ` +
    empresa.nomefantasia +
    ` irá disponibilizar na internet os serviços realizados em seu veículo.<br>
    Para maior facilidade, informaremos a data e a quilometragem das próximas manutenções no seu veiculo e promoções.
    Para ter acesso se cadastre no nosso portal através do botao abaixo.`              
    textoBotao = 'Crie sua conta'
  }else{
    mensagemCliente = `A YOUKAR em parceria com ` +
    empresa.nomefantasia +
    ` disponibiliza na internet os serviços realizados em seu veículo.<br>
    Para maior facilidade, informaremos a data e a quilometragem das próximas manutenções no seu veiculo e promoções.
    Acesse o nosso portal através do botão abaixo.`              
    textoBotao = 'Acesse sua conta'
  }


  var tColumns = "";
  for (var servicorealizado of servicorealizados) {
    var proximaDataTroca = moment(ordemservico.data, moment.ISO_8601).add(
      servicorealizado.servicoid.tempo,
      "month"
    );
    var proximaTroca =
      parseFloat(ordemservico.quilometragem) +
      parseFloat(servicorealizado.servicoid.quilometragem);
    servicorealizado.servicoid.proximaTroca = proximaTroca;

    tColumns +=
      `
              <tr>
                <td width='40%' style="text-align:left;">` +
      servicorealizado.servicoid.descricao +
      `</td>
                 <td width='35%' style="text-align:left;">` +
      proximaDataTroca.format("DD/MM/YYYY") +
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
        <mj-section padding-bottom="0" background-color="#fcfcfc">
        <mj-column width="100%">
          <mj-text align="center" font-size="20" color="grey" font-family="Helvetica Neue" font-weight="200">
            ` +
    empresa.nomefantasia +
    ` agradece sua visita.
          </mj-text>
          <mj-divider horizontal-spacing="0" vertical-spacing="0" padding-top="20" padding-bottom="0" padding-left="0" padding-right="0" border-width="1px" border-color="#f8f8f8" />
        </mj-column>
      </mj-section>
      <!-- Article -->
      <mj-section background-color="white">
        <mj-column width="350">
          <mj-text align="left" font-size="20" color="grey">
            Mais facilidades para você.
          </mj-text>
          <mj-text align="left" color="grey">`
            +
            mensagemCliente             
            +
          `</mj-text>
          <mj-button background-color="#F45E43" href="` 
          +acessopagina +
          `">
          `+ textoBotao +`
          </mj-button>                
        </mj-column>

      </mj-section>  
      <mj-section>
        <mj-text align="left" font-size="20" color="grey">
          Lista dos serviços realizados
        </mj-text>        
      </mj-section>
      <mj-section>
          <mj-column>
            <mj-table>
              <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                <th width='40%' style="text-align:left;" >Serviço</th>
                <th width='35%' style="text-align:left;" >Data próx. troca</th>
                <th width='25%' style="text-align:right;">KM próx. troca</th>
              </tr>      
              ` +
      tColumns +
      `
              </mj-table>
            </mj-column>
        </mj-section>
    </mj-body>
  </mjml>
  `;
  return tMjml;
};
/*
    veiculoid: { type: String, index:true, ref : 'Veiculo', required: [true, "Veiculo não informada"] },
    usuarioid: { type: String, index:true, ref : 'Usuario', required: [true, "Usuário não informada"] },
    empresaid: { type: String, index:true, ref : 'Empresa', required: [true, "Empresa não informada"] },

  */
