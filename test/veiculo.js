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
      var veiculos = []
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
            veiculos.push(veiculo);

          }
        });
        Veiculo.insertMany(veiculos, (err, docs) => {
          if (err) {
            console.log(err.code + " - " + err.message);
            process.exit(0);
          }else {
            console.log('veiculos cadastrado com sucesso');
            process.exit(0);
          }
        });        
      });
    });
  }
});
