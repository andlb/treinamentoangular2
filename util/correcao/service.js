"use strict";

const express = require('express');
const app = express();
const config = require("../../config/database")[app.get('env')];
const Servico = require("../../models/servico");
const Atualizacao = require("../../models/atualizacao");
const Tiposervico = require("../../models/tiposervico");
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
  Atualizacao.findOne({versao:'2017',patch:'1810'},(err,atualizacao)=> {
    if (atualizacao) {
      console.log('versao 2017 patch 1810 já foi realizado');
      return;
    }
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
       
    console.log('Versão 2017 patch 1810 foi atualizacao com sucesso');
    let at = new Atualizacao({
      versao:'2017',
      patch:'1810'        
    });
    at.save();    
  });
}
