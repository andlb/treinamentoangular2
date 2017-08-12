const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, err => {
  if (err) {
    console.log("could not connect to database", err);
  } else {
    //cadastrar veiculo, usuario e empresa.
    Ordemservico.remove(err => {
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }
      Empresa.find({}, (err, empresas) => {
        empresas.forEach(empresa => {
          Veiculo.find({}, (err, veiculos) => {
            veiculos.forEach(veiculo => {
              var ordemservico = {
                veiculoid: veiculo,
                usuarioid: veiculo.usuarioid,
                empresaid: empresa,
                data: Date.now(),
                status: 1,
                servicoRealizado:empresa.servicos
              };
              new Ordemservico(ordemservico).save();
            });
          });
        });
      });
    });
  }
});
