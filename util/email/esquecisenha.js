"use strict";
const mjml = require("mjml");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const config = require("../../config/database");
const Usuario = require("../../models/usuario");
const email = require("../../config/email");
const database = require("../../config/database");

exports.enviaEsqueciSenha = usuario => {
  this.envioEmail(usuario);

}

exports.envioEmail = (usuario) => {
  let token = jwt.sign(
    {
      userId: usuario._id,
      email: usuario.email
    },
    database.trocasenha,
    {
      expiresIn: "15 days"
    }
  );

  let acessopagina = database.acesso + "/reinializarsenha?tk=" + token;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: email.user,
      pass: email.pass
    }
  });
  let subject = this.getSubject( usuario);
  const {
    html,
    errors
  } = mjml.mjml2html(this.getHtml( usuario, acessopagina), {
    beautify: true,
    minify: true,
    level: "soft"
  });
    
  transporter.sendMail({
    from: "yucar <" + email.user + ">",
    to: "andlbp@gmail.com",
    subject: subject,    
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

exports.getSubject = ( usuario) => {
  return " Reinicializar senha.";
};

exports.getHtml = ( usuario, acessopagina) => {
  var tMjml = `
  <mjml>
    <mj-body>
      <mj-container>
        <mj-section background-color="#f0f0f0">
          <mj-column>
            <mj-text font-style="italic" font-size="20" color="#626262">
              Olá ` + usuario.nome + `
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section background-color="#fafafa">
          <mj-column width="400">
            <mj-text color="#525252" align="center">
            Seja bem vindo a YUCAR.COM, recebemos uma solicitação para uma nova senha associada a sua conta.
            Se você fez essa solicitação, por favor, confirme clicando no botão abaixo.
            </mj-text>
            <mj-button background-color="#F45E43" href="`+acessopagina+`">Confirmar alteração</mj-button>      
          </mj-column>
        </mj-section>
      </mj-container>      
    </mj-body>
  </mjml>`
  return tMjml;
};
