const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Servicorealizado = require("../models/servicorealizado");

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, err => {
  if (err) {
    console.log("could not connect to database", err);
  } else {
    //cadastrar veiculo, usuario e empresa.
    Servicorealizado.remove(err => {
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }
      Ordemservico.remove(err => {
        if (err) {
          console.log(err.code + " - " + err.message);
          process.exit(0);
        }
        Empresa.find({}, (err, empresas) => {
          empresas.forEach(empresa => {
            Veiculo.find({}, (err, veiculos) => {
              ordensServico = [];
              veiculos.forEach(veiculo => {
                var ordemservico = {
                  veiculoid: veiculo._id,
                  usuarioid: veiculo.usuarioid,
                  empresaid: empresa._id,
                  data: Date.now(),
                  status: 1
                  //servicoRealizado:empresa.servicos
                };
                ordensServico.push(ordemservico);
              });
              Ordemservico.insertMany(ordensServico, (err, docs) => {
                if (err) {
                  console.log(err.code + " - " + err.message);
                  process.exit(0);
                }
                var servicos = [];
                for (var cDoc = 1; c < docs.lengh; c++) {
                  for (var c = 1; c < empresa.servicos.lengh; c++) {
                    servico = empresa.servicos[c];
                    servico.ordemservicoid = docs[cDoc]._id;
                    servicos.push(servico);
                  }
                }
                Servicorealizado.insertMany(servicos, (err, docs) => {
                  if (err) {
                    console.log(err.code + " - " + err.message);
                    process.exit(0);
                  }else{
                    console.log('terminado com sucesso');
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
