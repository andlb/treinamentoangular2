"use strict";
const Veiculo = require("../models/veiculo");
const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Resposta = require("../models/resposta");
const Servicorealizado = require("../models/servicorealizado");
const Servico = require("../models/servico");
const moment = require("moment");
const numeral = require('numeral');

module.exports = router => {
  router.get("/servicos/:proprietarioid", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      servicorealizado: undefined
    };
    

    retorno.message = validaEntradaProprietario(req);
    if (retorno.message) {
      return res.json(retorno);
    }    
    Usuario.findById(req.params.proprietarioid, (err, oUsuario) => {
      if (err) {
        retorno.message = err.code + " - " + err.message;
        return res.json(retorno);
      }
      if (!oUsuario) {
        retorno.message = "Usuário não encontrado";
        return res.json(retorno);
      }
      retorno.proprietario = {
        nome: oUsuario.nome,
        endereco: oUsuario.endereco.endereco,
        bairro: oUsuario.endereco.bairro,
        numero: oUsuario.endereco.numero,
        complemento: oUsuario.endereco.complemento,
        estado: oUsuario.endereco.estado,
        cep: oUsuario.endereco.cep,
        cidade: oUsuario.endereco.cidade
      };
      Veiculo.find(
        {
          usuarioid: req.params.proprietarioid
        },
        (err, veiculos) => {
          if (err) {
            retorno.message = err.code + " - " + err.message;
            return res.json(retorno);
          }
          var veiculosid = [];
          for (var veiculo of veiculos) {
            veiculosid.push(veiculo._id);
          }
          Servicorealizado.find({
            veiculoid: { $in: veiculosid }
          })
            .populate("ordemservicoid veiculoid servicoid empresaid")
            .sort({
              veiculoid: 1,
              ordemservicoid: 1
            })
            .exec((err, servicorealizados) => {
              if (err) {
                retorno.message = err.code + " - " + err.message;
                return res.json(retorno);
              }
              var tServicosrealizados = [];
              for (let servicorealizado of servicorealizados) {
                var veiculoid = servicorealizado.veiculoid._id;
                let indice = tServicosrealizados.findIndex(
                  fVeiculo => fVeiculo.veiculoid === veiculoid
                );
                //quando não existe veiculo
                if (indice === -1) {
                  tServicosrealizados.push(insereVeiculo(servicorealizado));
                } else {
                  let indiceOrdemServico = tServicosrealizados[
                    indice
                  ].ordensservico.findIndex(
                    fOrdemservico =>
                      fOrdemservico._id === servicorealizado.ordemservicoid._id
                  );
                  if (indiceOrdemServico === -1) {
                    tServicosrealizados[indice].ordensservico.push(
                      insereOrdemServico(servicorealizado)
                    );
                  } else {
                    tServicosrealizados[indice].ordensservico[
                      indiceOrdemServico
                    ].servicos.push(insereServico(servicorealizado));
                  }
                }
              }
              retorno.success = true;
              //retorno.teste = servicorealizados;
              retorno.servicorealizados = tServicosrealizados;
              return res.json(retorno);
            });
        }
      );
    });
  });

  router.get("/getveiculo/:veiculoid", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      veiculo: undefined
    };
    if (!req.params.veiculoid) {
      retorno.message = "Veiculoid não informado";
      return res.json(retorno);
    }
    Veiculo.findOne({ _id: req.params.veiculoid }, (err, oVeiculo) => {
      if (err) {
        retorno.message = err.code + " - " + err.message;
        return res.json(retorno);
      }
      if (!oVeiculo) {
        retorno.message = "Veiculo não encontrado";
        return res.json(retorno);
      }
      retorno.veiculo = oVeiculo;
      retorno.success = true;
      return res.json(retorno);
    });
  });

  router.post("/salvarVeiculo", (req, res) => {
    const retorno = {
      success: false,
      message: ""
    };
    if (!req.body.veiculoid) {
      retorno.message = "Veiculoid não informado";
      return res.json(retorno);
    }
    if (!req.body.placa) {
      retorno.message = "Placa não informada";
      return res.json(retorno);
    }
    Veiculo.findOneAndUpdate(
      { _id: req.body.veiculoid, placa: req.body.placa },
      {
        $set: {
          marca: req.body.marca,
          modelo: req.body.modelo,
          ano: req.body.ano,
          anomodelo: req.body.anomodelo  
        }
      },
      (err, veiculo) => {
        if (err) {
          if (err.name === 'CastError'){
            retorno.message = "Veiculo ID não encontrado";
            return res.json(retorno);
          }else {
            retorno.message = err.code + " - " + err.message;
            return res.json(retorno);
          }
        }
        if (!veiculo) {
          retorno.message = 'Veículo não encontrado';
          return res.json(retorno); 
        }
        retorno.success = true;
        retorno.message = "Dados do veículo atualizado com sucesso";
        return res.json(retorno);
      }
    );
  });
  return router;
};


function insereVeiculo(servicorealizado) {
  return {
    veiculoid: servicorealizado.veiculoid._id,
    veiculo: servicorealizado.veiculoid,    
    ordensservico: [
      {
        _id: servicorealizado.ordemservicoid._id,
        status: servicorealizado.ordemservicoid.status,
        data: odbcToDisplay(servicorealizado.ordemservicoid.data),
        empresanome: servicorealizado.empresaid.nomefantasia,
        empresacelular: servicorealizado.empresaid.celular,
        quilometragem: numeral(servicorealizado.ordemservicoid.quilometragem).format('0,0'),
        servicos: [insereServico(servicorealizado)]
      }
    ]
  };
}

function insereOrdemServico(servicorealizado) {
  return {
    _id: servicorealizado.ordemservicoid._id,
    status: servicorealizado.ordemservicoid.status,
    data: odbcToDisplay(servicorealizado.ordemservicoid.data),
    empresanome: servicorealizado.empresaid.nomefantasia,
    empresacelular: servicorealizado.empresaid.celular,
    quilometragem: numeral(servicorealizado.ordemservicoid.quilometragem).format('0,0'),
    servicos: [insereServico(servicorealizado)]
  };
}

function insereServico(servicorealizado) {
  
  let proximaDataTroca = "Não definido";
  if (servicorealizado.proximatrocadata) {
    proximaDataTroca = moment(servicorealizado.proximatrocadata, moment.ISO_8601);        
    proximaDataTroca = proximaDataTroca.format("DD/MM/YYYY");
  }

  let proximaTroca = "Não definido";
  if (servicorealizado.proximatrocakm) {
    proximaTroca =numeral(servicorealizado.proximatrocakm).format('0,0')
  }
  let descricaoservico = "<strong>"+servicorealizado.servicoid.descricao+"</strong>";    
  if (servicorealizado.observacao) {
    descricaoservico += " <br/> " + servicorealizado.observacao
  }
  return {
    _id: servicorealizado.servicoid._id,
    descricao: servicorealizado.servicoid.descricao,
    tempo: servicorealizado.servicoid.tempo,
    quilometragem: servicorealizado.servicoid.quilometragem,
    proximatroca: proximaTroca,
    proximatrocadata:proximaDataTroca,
    observacao:servicorealizado.observacao
  };
}

function validaEntradaProprietario(req) {
  var message = "";
  if (!req.params.proprietarioid) {
    message = " Proprietário não informado ";
  }
  return message;
}

function validaEntradaProfile(req) {
  var message = "";
  if (!req.body.userid) {
    if (message != "") message = " , ";
    message += "Código do usuário não definido";
  }
  if (!req.body.nome) {
    if (message != "") message = " , ";
    message += "Nome não definido ";
  }
  if (message) {
    message = " Os seguintes campos são obrigatórios: " + message;
  }
  return message;
}

function odbcToDisplay(data) {
  var arrayData = data.toISOString().split("T");
  if (arrayData.length > 1) {
    var tarrayData = arrayData[0].split("-");
    return tarrayData[2] + "/" + tarrayData[1] + "/" + tarrayData[0];
  }
  return;
}
