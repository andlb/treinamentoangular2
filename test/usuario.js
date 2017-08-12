const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");

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

        empresa = {
          razaosocial: "CarboRio",
          nomefantasia: "Carbo Rio",
          nomeresponsavel: "Carbo Rio",
          email: "carborio@gmail.com",
          celular: "(17)90100101",
          telefone: "(17)90100101"
        };
        var oEmpresa = new Empresa(empresa);
        oEmpresa.save(err => {
          if (err) {
            console.log(err.code + " - " + err.message);
            process.exit(1);
          }

          empresa = {
            razaosocial: "B2Pneus",
            nomefantasia: "B2 Pneus",
            nomeresponsavel: "B2 Pneus",
            email: "b2pneus@b2pneus.com.br",
            celular: "(17)90100101",
            telefone: "(17)90100101"
          };
          var oEmpresa = new Empresa(empresa);
          oEmpresa.save((err, oEmpresa) => {
            if (err) {
              console.log(err.code + " - " + err.message);
              process.exit(1);
            } else {
              console.log(oEmpresa.razaosocial);

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
                  password: "10203040",
                  tipo: "1",
                  cpf: cpf,
                  empresa: empresa._id,
                  cadastrocompleto: { type: Boolean, default: false }
                };
                new Usuario(oUsuario).save(err => {
                  if (err) {
                    console.log(err.code + " " + err.message);
                    process.exit(1);
                  }
                });
              }
            }
          });
        });
      });
    });
  }
  return;
});
return;
