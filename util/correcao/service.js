"use strict";

const express = require('express');
const app = express();
const config = require("../../config/database")[app.get('env')];
const Ordemservico = require("../../models/ordemservico");
const Servico = require("../../models/servico");
const Servicorealizado = require("../../models/servicorealizado");
const Atualizacao = require("../../models/atualizacao");
const moment = require("moment");

exports.atualizaVersao = () => {  
  Atualizacao.findOne({versao:'2017',patch:'2809'},(err,atualizacao)=> {
    if (atualizacao) {
      console.log('versao 2017 patch 2809 já foi realizado');
      return;
    }  
    console.log('entrou ak');
    Servicorealizado.find({}).populate("ordemservicoid").exec((err,servicosrealizados) =>{
      for (let servicoreal of servicosrealizados) {
        Servico.findById(servicoreal.servicoid,(err,servico)=>{        
          if (servico.tempo) {  
            servicoreal.proximatrocadata = moment(servicoreal.ordemservicoid.data, moment.ISO_8601).add(
              servico.tempo,
              "month"
            ).toDate();
          }
          if (servico.quilometragem) {   
            servicoreal.proximatrocakm =
            parseFloat(servicoreal.ordemservicoid.quilometragem) +
            parseFloat(servico.quilometragem);  
          }
          servicoreal.save();
        });          
      };          
    });
    console.log('Versão 2017 patch 2809 foi atualizacao com sucesso');
    let at = new Atualizacao({
      versao:'2017',
      patch:'2809'        
    });
    at.save();
  });
}
