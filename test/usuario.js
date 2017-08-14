const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const bcrypt = require('bcrypt-nodejs');

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
      console.log("empresa deletada com sucesso");
      Usuario.remove(err => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log("usuario deletada com sucesso");
        //0 - usuário do portal
        for (c = 0; c < 50; c++) {
          var cpf = "0010010000" + c;
          if (c > 9) {
            cpf = "001001000" + c;
          }
          oUsuario = {
            nome: "andre luis borges de paula",
            email: "usuario" + c + "@gmail.com",
            password: "10203040",
            tipo: "0",
            cpf: cpf,
            cadastrocompleto: { type: Boolean, default: false }
          };
          new Usuario(oUsuario).save(err => {
            if (err) {
              console.log(err.code + " " + err.message);
              process.exit(1);
            }
          });
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
        Empresa.insertMany(empresas, (err, docs) => {
          if (err) {
            console.log(err.code + " - " + err.message);
            process.exit(0);
          }
          bcrypt.hash("10203040", null, null, function(err, hash) {
            // Store hash in your password DB.

            usuarios = [];
            for (var cDoc = 0; cDoc < docs.length; cDoc++) {
              empresa = docs[cDoc];
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
                  cadastrocompleto: { type: Boolean, default: false }
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
  }
});
