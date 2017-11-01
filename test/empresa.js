const express = require("express");
const app = express();

const mongoose = require("mongoose");
const config = require("../config/database")[app.get("env")];
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Servico = require("../models/servico");
const Tiposervico = require("../models/tiposervico");


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
          tipo: 2,
          status: 1
        };
        perguntas.push(pergunta);

        pergunta = {
          descricao: "De 0 a 5, o quanto você gostou desse atendimento",
          tipo: 3,
          status: 1
        };
        perguntas.push(pergunta);

        pergunta = {
          descricao: "Deixe seu comentário",
          tipo: 1,
          status: 1
        };
        perguntas.push(pergunta);

        oEmpresa.perguntas = perguntas;
        oEmpresa.save(err => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
    Tiposervico.remove(err => {
      Servico.remove(err => {
        if (err) {
          console.log(err.code + " - " + err.message);
          process.exit(0);
        }
        Empresa.find({}).exec((err, empresas) => {
          empresas.forEach(function(oEmpresa) {
            servicos = [];
            new Tiposervico({
              _id:1,
              descricao:'Troca de óleo'
            }).save();
        
            new Tiposervico({
              _id:2,
              descricao:'Troca de filtros'
            }).save();    
        
            new Tiposervico({
              _id:3,
              descricao:'Injeção'
            }).save(); 
        
            new Tiposervico({
              _id:4,
              descricao:'Limpeza de bico'
            }).save();    
        
            new Tiposervico({
              _id:5,
              descricao:'Velas'
            }).save();    
            
            new Tiposervico({
              _id:6,
              descricao:'Freios'
            }).save();    
        
            new Tiposervico({
              _id:7,
              descricao:'Correia dentada ou corrente'
            }).save();    
        
            new Tiposervico({
              _id:8,
              descricao:'Suspensão'
            }).save();    
        
            new Tiposervico({
              _id:9,
              descricao:'Pneus'
            }).save();    
        
            new Tiposervico({
              _id:10,
              descricao:'Rodizio de pneus'
            }).save();    
        
            new Tiposervico({
              _id:11,
              descricao:'Alinhamento e balanceamento'
            }).save();    
        
            new Tiposervico({
              _id:12,
              descricao:'Amortecedores'
            }).save(); 
        
            new Tiposervico({
              _id:13,
              descricao:'Bateria'
            }).save(); 
        
            new Tiposervico({
              _id:14,
              descricao:'Embreagem'
            }).save();     
        
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Alinhamento",
              tempo: 7,
              tiposervicoid: 11,
              quilometragem: 6000
            };
            servicos.push(servico);
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Sem tempo",
              quilometragem: 6000
            };
            servicos.push(servico);

            servico = {
              empresaid: oEmpresa._id,
              descricao: "Sem quilometragem",
              tempo: 7
            };
            servicos.push(servico);

            servico = {
              empresaid: oEmpresa._id,
              descricao: "Sem tempo e quilometragem"
            };
            servicos.push(servico);

            servico = {
              empresaid: oEmpresa._id,
              descricao: "Balanceamento",
              tempo: 4,
              tiposervicoid: 11,
              quilometragem: 5000
            };
            servicos.push(servico);
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Rodizio",
              tempo: 5,
              tiposervicoid: 10,
              quilometragem: 6000
            };
            servicos.push(servico);
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Freio",
              tempo: 6,
              tiposervicoid: 6,
              quilometragem: 40000
            };
            servicos.push(servico);
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Amortocedores",
              tempo: 12,
              tiposervicoid: 12,
              quilometragem: 90000
            };
            servicos.push(servico);
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Troca de óleo",
              tempo: 4,
              tiposervicoid: 1,
              quilometragem: 7000
            };
            servicos.push(servico);
            servico = {
              empresaid: oEmpresa._id,
              descricao: "Troca de filtros",
              tempo: 12,
              tiposervicoid: 2,
              quilometragem: 10000
            };
            servicos.push(servico);
            new Servico.insertMany(servicos, (err, docs) => {
              if (err) {
                console.log(err.code + " - " + err.message);
                process.exit(0);
              } else {
                console.log("processo terminado com sucesso");
                process.exit(0);
              }
            });
          });
        });
      });
    });
  }
});
