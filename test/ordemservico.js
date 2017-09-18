"use strict";
const express = require('express');
const app = express();

const mongoose = require("mongoose");
const config = require("../config/database")[app.get('env')];
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Servico = require("../models/servico");
const Servicorealizado = require("../models/servicorealizado");

console.log("tipo de ambiente")
console.log([app.get('env')]);

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
            gravaVeiculos(empresa,empresas);
          });
        });
      });
    });
  }
});

function gravaVeiculos(empresa,empresas){
  var quilometragem = 0;
  var ordensServico = [];
  Veiculo.find({}, (err, veiculos) => {
    veiculos.forEach(veiculo => {
      var ordemservico = {
        veiculoid: veiculo._id,
        usuarioid: veiculo.usuarioid,
        empresaid: empresa._id,
        data: Date.now(),
        status: 1,
        quilometragem: quilometragem + 1500
        //servicoRealizado:empresa.servicos
      };
      ordensServico.push(ordemservico);
    });
    console.log(ordensServico)
    Ordemservico.insertMany(ordensServico, (err, ordemservicos) => {
      if (err) {
        console.log(err.code + " - " + err.message);
        process.exit(0);
      }
      empresas.forEach(empresa => {
        gravaServicos(ordemservicos, empresa);
      });
    });
  });
}

function gravaServicos(ordemservicos, empresa) {
  Servico.find({ empresaid: empresa._id }, (err, servicos) => {
    if (err) {
      console.log(err.code + " - " + err.message);
      return;
    }
    var tServicos = [];
    for (var cDoc = 0; cDoc < ordemservicos.length; cDoc++) {
      for (var c = 0; c < servicos.length; c++) {
        var servico = servicos[c];
        var tServico = {};
        tServico.ordemservicoid = ordemservicos[cDoc]._id;
        tServico.empresaid = ordemservicos[cDoc].empresaid;
        tServico.veiculoid = ordemservicos[cDoc].veiculoid;
        tServico.servicoid = servico._id;
        tServicos.push(tServico);
      }
    }

    console.log(tServicos);
    Servicorealizado.insertMany(tServicos, (err, docs) => {
      if (err) {
        console.log(err.code + " - " + err.message);
        //process.exit(0);
      } else {
        console.log("terminado com sucesso");
        //process.exit(0);
      }
    });
  });
}
