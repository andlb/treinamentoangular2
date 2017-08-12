const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Servico = require("../models/servico");

mongoose.Promise = global.Promise;
console.log("entrou al");
mongoose.connect(config.uri, err => {
  if (err) {
    console.log("could not connect to database", err);
    return;
  } else {
    Empresa.find({}).exec((err, empresas) => {
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }
      empresas.forEach(oEmpresa => {
        perguntas = [];
        pergunta = {
          descricao: "De 0 a 10, o quanto você indica a empresa para amigos",
          tipo: 3,
          status: 1
        };
        perguntas.push(pergunta);

        pergunta = {
          descricao: "De 0 a 5, o quanto você gostou desse atendimento",
          tipo: 2,
          status: 1
        };
        perguntas.push(pergunta);

        pergunta = {
          descricao: "Deixe seu comentário",
          tipo: 1,
          status: 1
        };
        perguntas.push(pergunta);

        oEmpresa.servicos.perguntas = perguntas;
        oEmpresa.save(err => {
          if (err) {
            console.log(err);
          }
        });
      });
    });

    Empresa.find({}).exec((err, empresas) => {
      empresas.forEach(function(oEmpresa) {
        servico = {
          empresaid: oEmpresa._id,
          descricao: "Alinhamento",
          tempo: 6,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        })

        servico = {
          empresaid: oEmpresa._id,
          descricao: "Balanceamento",
          tempo: 6,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        })        
        servico = {
          empresaid: oEmpresa._id,
          descricao: "Rodizio",
          tempo: 6,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        })        
        servico = {
          empresaid: oEmpresa._id,
          descricao: "Freio",
          tempo: 6,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        })        
        servico = {
          empresaid: oEmpresa._id,
          descricao: "Amortocedores",
          tempo: 12,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        })        
        servico = {
          empresaid: oEmpresa._id,
          descricao: "Troca de óleo",
          tempo: 12,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        })        
        servico = {
          empresaid: oEmpresa._id,
          descricao: "Troca de filtros",
          tempo: 12,
          quilometragem: 10000
        };
        new Servico(servico).save(err=> {
          if (err) {
            console.log(err.code + ' - '+err.message);
            process.exit(0);
          }
        });
      });
    });
  }
});
