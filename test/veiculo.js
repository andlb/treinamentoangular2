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
    var cPlaca = 0;
    Veiculo.remove(err => {
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }
      Usuario.find({ tipo: 0 }, (err, usuarios) => {
        usuarios.forEach(usuario => {
          for (c = 0; c < 2; c++) {
            cPlaca++;
            placa = "AAA-101" + cPlaca;
            if (cPlaca > 9) {
              placa = "AAA-20" + cPlaca;
            }
            veiculo = {
              usuarioid: usuario._id,
              placa: placa
            };
            new Veiculo(veiculo).save((err, veiculo) => {
              if (err) console.log(err.code + " - " + err.message);
            });
          }
        });
      });
    });
  }
});
