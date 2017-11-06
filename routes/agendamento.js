const express = require('express');
const app = express();
const Agendamento = require("../models/agendamento");

module.exports = router => {
  router.post("/placa", (req, res) => {
    const retorno = {
      success: false,
      message: "",
      codigoerro: ""
    };
    if (!req.body.placa) {  
      retorno.message = 'Placa não informada'
      return res.json(retorno);
    }
    let placa= req.body.placa;
    Agendamento.findOne({placa:placa}).exec((err,oAgendamento)=>{
      if (err) {
        retorno.message = err.code + " - " + err.message;        
        retorno.codigoerro = '000';
        return res.json(retorno);
      }
      if (!oAgendamento ){
        oAgendamento = new Agendamento()
      }
      oAgendamento.placa = placa
      oAgendamento.save();
      retorno.success = true;
      retorno.message = "Agendamento realizado com sucesso";
      res.json(retorno);
    });
  });
  return router;
};