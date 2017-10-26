"use strict";

const express = require('express');
const app = express();
const config = require("../../config/database")[app.get('env')];
const Servico = require("../../models/servico");
const Servicorealizado = require("../../models/servicorealizado");
const Atualizacao = require("../../models/atualizacao");
const Tiposervico = require("../../models/tiposervico");
const Veiculo = require("../../models/veiculo");
const Ordemservico = require("../../models/ordemservico");

const moment = require("moment");


exports.atualizaVersao = async function() {

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

    new Tiposervico({
      _id:13,
      descricao:'Bateria'
    }).save(); 

    new Tiposervico({
      _id:14,
      descricao:'Embreagem'
    }).save();     

    console.log('Versão 2017 patch 1810 foi atualizacao com sucesso');
    let at = new Atualizacao({
      versao:'2017',
      patch:'1810'        
    });
    at.save();    
  });
  let oAtualizacao = await Atualizacao.findOne({versao:'2017',patch:'2410'});  
  if (!oAtualizacao) {
    let oServicoraelizados = await Servicorealizado.find({}).sort({veiculoid:1});    
    if (!oServicoraelizados) {
      console.log('o Servico realizado não encontrado')
      return;
    }
    for (let oServicoreal of oServicoraelizados ) {
      let veiculo = await Veiculo.findById(oServicoreal.veiculoid);
      let oServico = await Servico.findById(oServicoreal.servicoid);
      
      let tiposervico = oServico.tiposervicoid;      
      let ordemservico = await Ordemservico.findById(oServicoreal.ordemservicoid);
      let tEncontrado = false;
      if (tiposervico) {
        if (veiculo.tiposervicos) {
          for (let cTs = 0;cTs < veiculo.tiposervicos.length;cTs++) {      
            if (veiculo.tiposervicos[cTs].tiposervicoid === tiposervico){
              tEncontrado = true;
              veiculo.tiposervicos[cTs].quilometragem = ordemservico.quilometragem;
              veiculo.tiposervicos[cTs].dataultimarealizacao = ordemservico.data;              
              if (oServico.tempo) {  
                veiculo.tiposervicos[cTs].proximatrocadata = oServicoreal.proximatrocadata;
              }
              if (oServico.quilometragem) {
                veiculo.tiposervicos[cTs].proximatrocakm = oServicoreal.proximatrocakm;
              }
            }
          } 
        }   
        if (!tEncontrado){          
          let oTipoServico = {};
          oTipoServico.tiposervicoid = tiposervico;
          oTipoServico.dataultimarealizacao = ordemservico.data;
          oTipoServico.quilometragem = ordemservico.quilometragem;
          if (oServico.quilometragem) {
            oTipoServico.proximatrocakm = oServicoreal.proximatrocakm;
          }
          if (oServico.tempo) {
            oTipoServico.proximatrocadata = oServicoreal.proximatrocadata;
          }
          veiculo.tiposervicos.push(oTipoServico);          
        } 
        veiculo.save();
      }
    }
    let at = new Atualizacao({
      versao:'2017',
      patch:'2410'        
    });
    at.save();    
    console.log('versao 2017 patch 2410 realizado com sucesso');
  }else {
    console.log('versao 2017 patch 2410 já foi realizado');
    return;    
  }




  /*
  Atualizacao.findOne({versao:'2017',patch:'2410'},(err,atualizacao)=> {
    if (atualizacao) {
      console.log('versao 2017 patch 2410 já foi realizado');
      return;
    }  

    //let oServicoRealizado = Servicorealizado.find({}).populate("veiculoid, servicoid").exec((err,servicorealizado));
    //let tiposervico = await Servicorealizado.findById(1);

    console.log('Versão 2017 patch 2410 foi atualizacao com sucesso');
    let at = new Atualizacao({
      versao:'2017',
      patch:'2410'        
    });
    at.save();       
  });
  */
}


