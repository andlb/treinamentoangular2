const Veiculo = require("../models/veiculo");
const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Resposta = require("../models/resposta");

module.exports = router => {
  "use strict";

  router.get("/placa/:placa", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      veiculo: undefined,
      usuario: undefined
    };
    return res.json(retorno);
    if (!req.params.placa) {
      message: "Não foi informado a placa";
      return res.json(retorno);
    }
    Veiculo.find(
      {
        placa: req.params.placa
      },
      (err, veiculo) => {
        if (err) {
          retorno.message = err.code + " " + err.message;
          return res.json(retorno);
        }
        usuarioid = veiculo[0].usuarioid;
        Usuario.find(
          {
            _id: usuarioid
          },
          (errUsuario, usuario) => {
            if (errUsuario) {
              retorno.message = err.code + " " + err.message;
              return res.json(retorno);
            }
            retorno.success = true;
            retorno.veiculo = veiculo;
            retorno.proprietario = usuario;
            return res.json(retorno);
          }
        );
      }
    ).sort({
      _id: 1
    });
    if (!req.params.placa) {
      message: "Placa não encontrada";
      return res.json(retorno);
    }
  });

  router.get("/getOrdemservico/:id/:empresaid", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      veiculos: [{}]
    };
    if (!req.params.id) {
      this.retorno.message = "Id da ordem de serviço não encontrado.";
      return res.json(this.retorno);
    }

    if (!req.params.empresaid) {
      this.retorno.message = "Empresa não informada.";
      return res.json(this.retorno);
    }
    Ordemservico.findOne({
      _id: req.params.id,
      empresaid: req.params.empresaid
    })
      .populate("usuarioid", "nome email cpf")
      .populate("veiculoid")
      .exec((err, oOrdemServico) => {
        if (err) {
          retorno.message = "Ordem de serviço não encontrada";
          return res.json(retorno);
        }
        retorno.success = true;
        retorno.ordensservico = oOrdemServico;
        retorno.veiculo = oOrdemServico.veiculoid;
        retorno.proprietario = oOrdemServico.usuarioid;        
        console.log("retorno "+ retorno);
        return res.json(retorno);
      });
  });

  router.get("/getAvaliacao/:ordemservicoid", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      perguntas: [{}]
    };
    //verify if the compane was informed.
    if (!req.params.ordemservicoid) {
      retorno.message = "ordem de servico não informada";
      return res.json(retorno);
    }
    Ordemservico.findById(req.params.ordemservicoid)
      .populate("empresaid")
      .exec((err, oOrdemservico) => {
        if (err) {
          retorno.message = err.code + " " + err.message;
          return res.json(retorno);
        }
        Resposta.find({
          ordemservicoid: req.params.ordemservicoid
        }).exec((err, respostas) => {
          console.log('entrou em perguntas ' + respostas );
          if (err) {
            retorno.message = err.code + " " + err.message;
            return res.json(retorno);
          }
          retorno.success = true;
          retorno.message = "Pesquisa realizada com sucesso";
           if ((respostas) && (respostas.length > 0)) {
            retorno.perguntas = respostas;
          } else {
            retorno.perguntas = oOrdemservico.empresaid.perguntas;
          }
          return res.json(retorno);
        });
      });
  });

  router.get("/getAllOrdemServico/:empresaid/:usuarioid", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      veiculos: [{}]
    };

    //verify if the compane was informed.
    if (!req.params.empresaid) {
      retorno.message = "Empresa não informada";
      return res.json(retorno);
    }
    //verify if the user exist.
    if (!req.params.usuarioid) {
      retorno.message = "Usuário não informado";
      return res.json(retorno);
    }

    /******************************/
    //TODO: Pesquisa por periodo veiculo e status.
    //valida se o usuário pertence a emrpesa
    Usuario.findOne(
      {
        _id: req.params.usuarioid
      },
      {
        empresa: 1
      },
      (err, usuario) => {
        if (err) {
          retorno.message = "Erro Usuario:" + err.code + " " + err.message;
          return res.json(retorno);
        }
        if (!usuario) {
          retorno.message = "Usuário não encontrado";
          return res.json(retorno);
        }
        //se a empresa que o usuarío trabalha não for a mesma que está sendo pesquisado as placas
        if (usuario.empresa !== req.params.empresaid) {
          retorno.message = "Sem acesso para acessar essa empresa ";
          return res.json(retorno);
        }
        //TODO: Pesquisa por periodo veiculo e status para saber se esta em aberto.
        //pesquisas os atendimentos em aberto.
        Ordemservico.find({ empresaid: req.params.empresaid, status:1 })
          .populate("veiculoid usuarioid empresaid", "placa email nome nomefantasia")
          .exec((err, ordens) => {
            if (err) {
              retorno.message = "Ordem de serviço não encontrada";
              return res.json(retorno);
            }
            retorno.success = true;
            retorno.ordensservico = ordens;
            return res.json(retorno);
          });
      }
    );
  });

  router.post("/salvarAvaliacao", (req, res) => {
    let retorno = {
      success: false,
      message: ""
    };
    let erroMsg = "";
    if (!req.body.ordemservicoid) {
      retorno.message = "Ordem de servico não foi informada";
      return res.json(retorno);
    }

    if (!req.body.json) {
      retorno.message = "Variável JSON não foi preenchido com as repostas";
      return res.json(retorno);
    }
    var oJson =req.body.json;
    if (!oJson) {
      retorno.message = "Não foi possivel transformar a variavel JSON";
      return res.json(retorno);
    }
    
    Ordemservico.findById(
      req.body.ordemservicoid
    ).exec((err, oOrdemservico) => {
      if (err){
        retorno.message = err.code + " " + err.message;
        return res.json(retorno);
      }
      
      if (!oOrdemservico){
        retorno.message = "Ordem de serviço não encontrado";
        return res.json(retorno);
      }
      for (var c=0;c < oJson.length;c++){
        new Resposta(oJson[c]).save();
      }
      oOrdemservico.status = 2;
      oOrdemservico.save();
      retorno.success = true;
      retorno.message = ""
      return res.json(retorno);      
    });
  });

  router.post("/cadastra", (req, res) => {
    let retorno = {
      success: false,
      message: ""
    };
    let erroMsg = "";
    if (!req.body.placa) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " a placa ";
    }
    if (!req.body.email) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o e-mail ";
    }
    if (!req.body.nome) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o nome ";
    }
    if (!req.body.cpf) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o cpf ";
    }
    if (!req.body.quilometragem) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " a quilometragem ";
    }
    if (!req.body.empresaid) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " a empresa ";
    }

    if (erroMsg) {
      retorno.message = "Os seguintes campos deve ser preenchidos: " + erroMsg;
      res.json(retorno);
      return retorno;
    }

    let atributos = [];
    if (req.body.quilometragem) {
      let atributo = {
        quilometragem: req.body.quilometragem,
        data: Date.now()
      };
      atributos.push(atributo);
    }
    var veiculo = {
      marca: req.body.marca,
      modelo: req.body.modelo,
      placa: req.body.placa,
      ano: req.body.ano,
      anoModelo: req.body.anomodel,
      atributos: atributos
    };
    var usuario = {
      nome: req.body.nome,
      email: req.body.email,
      tipo: 1,
      cpf: req.body.cpf
    };
    Empresa.findOne({ _id: req.body.empresaid }).exec((err, oEmpresa) => {
      if (err) {
        retorno.message = err.code + " - " + err.message;
        return res.json(retorno);
      }
      if (!oEmpresa) {
        retorno.message = "Empresa não encontrada";
        return res.json(retorno);
      }
      Usuario.findOne({ cpf: req.body.cpf }).exec((err, oUsuario) => {
        if (err) {
          retorno.message = err.code + " - " + err.message;
          return res.json(retorno);
        }
        //verify if the user exist
        if (!oUsuario) {
          //cadastra
          oUsuario = new Usuario(usuario);
        }
        oUsuario.nome = usuario.nome;
        //somente troca de email se ele não ter e-mail cadastrado
        if (!oUsuario.email) oUsuario.email = usuario.email;
        oUsuario.cpf = usuario.cpf;
        oUsuario.save(err => {
          if (err) {
            //return err message
            if (err.code === 11000) {
              res.json({
                success: false,
                message: "Usuário já cadastrado"
              });
            } else {
              retorno.message = err.code + " " + err.message;
              return res.json(retorno);
            }
          }
          //pesquisa pelo veiculo pela placa
          Veiculo.findOne({ placa: req.body.placa }).exec((err, oVeiculo) => {
            if (err) {
              retorno.message = err.code + " " + err.message;
              return res.json(retorno);
            }
            //se o veiculo não for encontrado
            if (!oVeiculo) {
              oVeiculo = new Veiculo();
            }
            oVeiculo.usuarioid = oUsuario._id;
            oVeiculo.marca = veiculo.marca;
            oVeiculo.modelo = veiculo.modelo;
            oVeiculo.placa = veiculo.placa;
            oVeiculo.ano = veiculo.ano;
            oVeiculo.anoModelo = veiculo.anoModelo;
            oVeiculo.atributos = veiculo.atributos;
            oVeiculo.save(err => {
              if (err) {
                retorno.message = err.code + " " + err.message;
                return res.json(retorno);
              }
              var ordemservicoid = req.body.ordemservicoid;
              Ordemservico.findById(
                ordemservicoid
              ).exec((err, ordemservico) => {
                if (err) {
                  retorno.message = err.code + " " + err.message;
                  return res.json(retorno);
                }
                if (!ordemservico) {
                  ordemservico = new Ordemservico();
                }
                ordemservico.veiculoid = oVeiculo._id;
                ordemservico.usuarioid = oUsuario._id;
                ordemservico.empresaid = req.body.empresaid;
                //TODO: Falta os serviços realizados.
                ordemservico.save(err => {
                  if (err) {
                    retorno.message = err.code + " " + err.message;
                    return res.json(retorno);
                  }
                  retorno.success = true;
                  retorno.message = "Ordem de serviço cadastrada com sucesso";
                  res.json(retorno);
                });
              });
            });
          });
        });
      });
    });
  });

  return router;
};
