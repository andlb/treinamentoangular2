"use strict";
const Veiculo = require("../models/veiculo");
const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Resposta = require("../models/resposta");
const Servicorealizado = require("../models/servicorealizado");
const Servico = require("../models/servico");

module.exports = router => {
  //TODO: trazer os dados do veiculo e os dados do proprietário.
  //TODO: validar se o usuário que enviou os dados é o mesmo que que tem acesso ao veiculo.
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
          console.log(veiculosid);
          Servicorealizado.find({
            veiculoid: { $in: veiculosid }
          })
            .populate("ordemservicoid veiculoid servicoid")
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
              /*
          var tServicosrealizados = [{
            veiculoid:{
              veiculoid:'',
              veiculo:'',
              ordensservico:[{
                ordenservicoid:'',
                ordemservico:'',
                servicos:[{
                  servicoid:'',
                  servico:''
                }]
              }]

            }
          }]*/

              for (let servicorealizado of servicorealizados) {
                var veiculoid = servicorealizado.veiculoid._id;
                let indice = tServicosrealizados.findIndex(
                  fVeiculo => fVeiculo.veiculoid === veiculoid
                );
                if (indice === -1) {
                  tServicosrealizados.push({
                    veiculoid: veiculoid,
                    veiculo: servicorealizado.veiculoid,
                    ordensservico: [
                      {
                        ordenservicoid: servicorealizado.ordemservicoid._id,
                        ordenservico: servicorealizado.ordemservicoid,
                        servicos: [
                          {
                            servicoid: servicorealizado.servicoid._id,
                            servico: servicorealizado.servicoid
                          }
                        ]
                      }
                    ]
                  });
                } else {
                  let indiceOrdemServico = tServicosrealizados[
                    indice
                  ].ordensservico.findIndex(
                    fOrdemservico =>
                      fOrdemservico.ordenservicoid ===
                      servicorealizado.ordemservicoid._id
                  );
                  if (indiceOrdemServico === -1) {
                    tServicosrealizados[indice].ordensservico.push({
                      ordenservicoid: servicorealizado.ordemservicoid._id,
                      ordenservico: {
                        _id: servicorealizado.ordemservicoid._id,
                        status: servicorealizado.ordemservicoid.status,
                        data: servicorealizado.ordemservicoid.data
                      },
                      servicos: [
                        {
                          servicoid: servicorealizado.servicoid._id,
                          servico: servicorealizado.servicoid
                        }
                      ]
                    });
                  } else {
                    tServicosrealizados[indice].ordensservico[
                      indiceOrdemServico
                    ].servicos.push({
                      servicoid: servicorealizado.servicoid._id,
                      servico: servicorealizado.servicoid
                    });
                  }
                }
              }
              retorno.success = true;
              retorno.servicorealizados = tServicosrealizados;
              return res.json(retorno);
            });
        }
      );
    });
    return router;
  });

  router.post("/editProfile", (req, res) => {
    const retorno = {
      success: false,
      message: ""
    };
    retorno.message = validaEntradaProfile(req);
    if (retorno.message) {
      return res.json(retorno);
    }
    Usuario.findOne(
      {
        _id: req.body.userid
      },
      (err, user) => {
        if (err) {
          retorno.mensagem = err;
          res.json(retorno);
          return;
        }
        if (!user) {
          retorno.mensagem = "Usuario não encontrado";
          res.json(retorno);
          return;
        }
        user.nome = req.body.nome;
        user.tipo = 0;
        user.cadastrocomplemento = 1;
        user.endereco = {
          endereco: req.body.endereco,
          bairro: req.body.bairro,
          numero: req.body.numero,
          complemento: req.body.complemento,
          estado: req.body.estado,
          cep: req.body.cep
        };
        user.save(err => {
          if (err) {
            res.json({ success: false, message: err }); // Return error message
          } else {
            res.json({
              success: true,
              message: "Dados cadastrados com sucesso"
            }); // Return success message
          }
        });
      }
    );
  });
  return router;
};

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
