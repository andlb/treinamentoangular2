"use strict";

const express = require('express');
const app = express();
const config = require("../../config/database")[app.get('env')];
const Servico = require("../../models/servico");
const Atualizacao = require("../../models/atualizacao");
const moment = require("moment");

exports.atualizaVersao = () => {  
  Atualizacao.findOne({versao:'2017',patch:'1710'},(err,atualizacao)=> {
    if (atualizacao) {
      console.log('versao 2017 patch 1710 já foi realizado');
      return;
    }     
    Servico.find({}).exec((err,servicos) => {
      for(let servico of servicos){
        servico.status = true;
        servico.save();        
      }
    });
    console.log('Versão 2017 patch 1710 foi atualizacao com sucesso');
    let at = new Atualizacao({
      versao:'2017',
      patch:'1710'        
    });
    at.save();
  });
}
