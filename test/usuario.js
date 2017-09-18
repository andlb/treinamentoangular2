
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const config = require("../config/database")[app.get('env')];
const Veiculo = require("../models/veiculo");
const moment = require('moment');
const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Usuarioconvidar = require("../models/usuarioconvidar");
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;
console.log("entrou al");
mongoose.connect(config.uri, err => {
  if (err) {
    console.log("could not connect to database", err);
    return;
  } else {
    Empresa.remove(err => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      Usuarioconvidar.remove(err => {
        console.log("empresa deletada com sucesso");
        Usuario.remove(err => {
          if (err) {
            console.log(err);
            process.exit(1);
          }
          bcrypt.hash("10203040", null, null, function(err, hash) {
            console.log("usuario deletada com sucesso");
            //0 - usuário do portal
            let usuarios = [];
            for (c = 0; c < 50; c++) {
              var cpf = "0010010000" + c;
              if (c > 9) {
                cpf = "001001000" + c;
              }
              oUsuario = {
                nome: "andre luis borges de paula",
                email: "usuario" + c + "@gmail.com",
                password: hash,
                tipo: "0",
                cpf: cpf,
                cadastrocompleto: false,
                cadastrado: false
              };
              usuarios.push(oUsuario);
            }
            new Usuario.insertMany(usuarios, (err, oUsuarios) => {
              if (err) {
                console.log(err.code + " - " + err.message);
                process.exit(0);
              }
              var cemail = 50;
              empresas = [];
              empresa = {
                razaosocial: "CarboRio",
                nomefantasia: "Carbo Rio",
                nomeresponsavel: "Carbo Rio",
                email: "carborio@gmail.com",
                celular: "(17)90100101",
                telefone: "(17)90100101"
              };
              empresas.push(empresa);
              empresa = {
                razaosocial: "B2Pneus",
                nomefantasia: "B2 Pneus",
                nomeresponsavel: "B2 Pneus",
                email: "b2pneus@b2pneus.com.br",
                celular: "(17)90100101",
                telefone: "(17)90100101"
              };
              empresas.push(empresa);
              Empresa.insertMany(empresas, (err, oEmpresas) => {
                if (err) {
                  console.log(err.code + " - " + err.message);
                  process.exit(0);
                }

                // Store hash in your password DB.
                GravaConvidados(oUsuarios, oEmpresas);
                usuarios = [];
                for (var cDoc = 0; cDoc < oEmpresas.length; cDoc++) {
                  empresa = oEmpresas[cDoc];
                  console.log(empresa);
                  for (c = 0; c < 5; c++) {
                    var cpf = "0010010000" + c;
                    if (c > 9) {
                      cpf = "001001000" + c;
                    }
                    cemail++;
                    var email = empresa.razaosocial + cemail + "@gmail.com";
                    oUsuario = {
                      nome: "usuário de empresa " + empresa.razaosocial,
                      email: email,
                      password: hash,
                      tipo: "1",
                      cpf: cpf,
                      empresa: empresa._id,
                      cadastrocompleto: false
                    };
                    usuarios.push(oUsuario);
                  }
                }
                console.log(usuarios);
                Usuario.insertMany(usuarios, (err, docs) => {
                  if (err) {
                    console.log(err.code + " - " + err.message);
                    process.exit(0);
                  } else {
                    console.log("Dados cadastradados com sucesso");
                    process.exit(0);
                  }
                });
              });
            });
          });
        });
      });
    });
  }
});

function GravaConvidados(oUsuarios, oEmpresas) {
  let dataProximoEnvio = moment(Date.now()).add(
    -1,
    "days"
  );  
  let oConvidados = [];
  for (let oUsuario of oUsuarios) {
    for (let oEmpresa of oEmpresas) {
      let usuarioConvidar = {
        usuarioid: oUsuario._id,
        empresaid: oEmpresa._id,
        dataproximoenvio: dataProximoEnvio
      };
      oConvidados.push(usuarioConvidar);
    }
  }
  Usuarioconvidar.insertMany(oConvidados);
}
