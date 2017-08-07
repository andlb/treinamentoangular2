
const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");

mongoose.Promise = global.Promise;
console.log('entrou al');
mongoose.connect(config.uri, err => {
  if (err) {
    console.log("could not connect to database", err);
    return;
  } else {
    //cadastrar veiculo, usuario e empresa.
    Empresa.findById("597c84031541c104080666e4").exec((err, oEmpresa) => {
      perguntas = [];
      pergunta = {
        descricao: "De 0 a 10, o quanto você indica a empresa para amigos",
        tipo: 1,
        status: 1
      };
      perguntas.push(pergunta);

      pergunta = {
        descricao: "De 0 a 5, o quanto você gostou desse atendimento",
        tipo: 1,
        status: 1
      };
      perguntas.push(pergunta);

      oEmpresa.perguntas = perguntas;
      oEmpresa.save(err => {
        if (err) {
          console.log(err);
        }
        console.log("Empresa atualizada com sucesso");
        console.log(oEmpresa);
      });
    });
  }
});
