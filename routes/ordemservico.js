"use strict";
const Veiculo = require("../models/veiculo");
const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");
const Resposta = require("../models/resposta");
const Servicorealizado = require("../models/servicorealizado");
const Tiposervico = require("../models/tiposervico");

const Usuarioconvidar = require("../models/usuarioconvidar");
const Inscricao = require('../util/email/inscricao');
const Agradecimento = require("../util/email/agradecimento");
const moment = require("moment");
const Servico = require("../models/servico");

module.exports = router => {  
  router.get("/placa/:placa", (req, res) => {
    let retorno = {
      success: false,
      message: "",
      veiculo: undefined,
      usuario: undefined
    };
    if (!req.params.placa) {
      retorno.message = "Não foi informado a placa";
      return res.json(retorno);
    }
    Veiculo.findOne(
      {
        placa: req.params.placa
      },
      (err, veiculo) => {
        if (err) {
          retorno.message = err.code + " " + err.message;
          return res.json(retorno);
        }
        if (!veiculo) {
          retorno.success = true;
          return res.json(retorno);
        }
        var usuarioid = veiculo.usuarioid;
        Usuario.findOne(
          {
            _id: usuarioid
          },
          (errUsuario, usuario) => {
            if (errUsuario) {
              retorno.message = errUsuario.code + " " + errUsuario.message;
              return res.json(retorno);
            }
            retorno.success = true;
            retorno.veiculo = veiculo;
            const oUsuario = {
              _id: usuario._id,
              cpf: usuario.cpf,
              nome: usuario.nome,
              email: usuario.email,
              datanascimento: usuario.datanascimento,
              cadastrado: usuario.cadastrado,
              telefone:usuario.telefone,
              telefoneddd:usuario.telefoneddd
            };
            retorno.proprietario = oUsuario;
            return res.json(retorno);
          }
        );
      }
    );
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
      .populate("usuarioid", "nome email cpf datanascimento telefone telefoneddd")
      .populate("veiculoid")
      .exec((err, oOrdemServico) => {
        if (err) {
          retorno.message = err.code + " - " + err.message;
          return res.json(retorno);
        }
        if (!oOrdemServico) {
          retorno.message = "Ordem de serviço não encontrada";
          return res.json(retorno);
        }
        var usuario = oOrdemServico.usuarioid;
        const oUsuario = {
          _id: usuario._id,
          cpf: usuario.cpf,
          nome: usuario.nome,
          email: usuario.email,
          datanascimento: usuario.datanascimento,
          telefone:usuario.telefone,
          telefoneddd:usuario.telefoneddd
        };
        Servico.find({ empresaid: req.params.empresaid }, (err, servicos) => {
          if (err) {
            retorno.message = err.code + " - " + err.message;
            return res.json(retorno);
          }
          Servicorealizado.find(
            { ordemservicoid: req.params.id },
            (err, servicorealizado) => {
              if (err) {
                retorno.message = err.code + " - " + err.message;
                return res.json(retorno);
              }
              retorno.ordemservico = oOrdemServico;
              retorno.veiculo = oOrdemServico.veiculoid;
              
              retorno.proprietario = oUsuario;
              retorno.success = true;
              retorno.servicos = servicos;
              retorno.servicorealizado = servicorealizado;
              return res.json(retorno);
            }
          );
        });
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
          if (err) {
            retorno.message = err.code + " " + err.message;
            return res.json(retorno);
          }
          retorno.success = true;
          retorno.message = "Pesquisa realizada com sucesso";
          if (respostas && respostas.length > 0) {
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
        //pesquisas os atendimentos em aberto.
        Ordemservico.find({ empresaid: req.params.empresaid, status: "1" })
          .populate(
            "veiculoid usuarioid empresaid",
            "placa email nome nomefantasia"
          )
          .exec((err, ordens) => {
            if (err) {
              retorno.message = err.code + " - " + err.message;
              return res.json(retorno);
            }
            if (ordens.length === 0) {
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
    var oJson = req.body.json;
    if (!oJson) {
      retorno.message = "Não foi possivel transformar a variavel JSON";
      return res.json(retorno);
    }

    Ordemservico.findById(
      req.body.ordemservicoid
    ).exec((err, oOrdemservico) => {
      if (err) {
        retorno.message = err.code + " " + err.message;
        return res.json(retorno);
      }
      if (!oOrdemservico) {
        retorno.message = "Ordem de serviço não encontrado";
        return res.json(retorno);
      }
      Resposta.insertMany(oJson, (err, docs) => {
        if (err) {
          retorno.message = err.code + " " + err.message;
          return res.json(retorno);
        }
        oOrdemservico.status = 2;
        oOrdemservico.save();
        retorno.success = true;
        retorno.message = "";
        return res.json(retorno);
      });
    });
  });

  router.post("/deletar", (req, res) => {
    let retorno = {
      success: false,
      message: ""
    };
    if (!req.body.empresaid ) {
      message = ' empresa não informada ';
      res.json(retorno);
    }
    if (!req.body.cpf) {
      message = ' cpf não informada ';
      res.json(retorno);      
    }
    if (!req.body.ordemservicoid) {
      message = ' ordem de serviço não informada ';
      res.json(retorno);
    }
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
        var ordemservicoid = req.body.ordemservicoid;
        Ordemservico.findById(
          ordemservicoid
        ).exec((err, ordemservico) => {
          if (err) {
            retorno.message = err.code + " " + err.message;
            return res.json(retorno);
          }
          if (!ordemservico) {
            retorno.message = 'Ordem de serviço não encontrada';
            return res.json(retorno);            
          }
          ordemservico.status = 0;
          ordemservico.save((err, ordemservico) => {
            if (err) {
              retorno.message = err.code + " " + err.message;
              return res.json(retorno);
            }else{
              retorno.success = true;
              retorno.message = "Ordem de serviço inativada";
              return res.json(retorno);
            }
          });
        });
      });
    });
  });

  router.post("/cadastra",  (req, res) => {    
    let retorno = {
      success: false,
      message: ""
    };

    try {



      let erroMsg = "";
      let usuarioNovo = false;
      let finalizar=false;
      let novaOrdemServico = false;
      if (req.body.finalizar){
        finalizar=true;
      }

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
      var atributo = {};
      if (req.body.quilometragem) {
        atributo = {
          quilometragem: req.body.quilometragem,
          data: Date.now()
        };    
      }
      var veiculo = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        placa: req.body.placa,
        ano: req.body.ano,
        anomodelo: req.body.anomodelo,
      };
      var dtNascimento = "";
      if (req.body.datanascimento) {
        var tNascimento = req.body.datanascimento.split("/");
        if (tNascimento.length === 3) {
          tNascimento =
            tNascimento[2] + "-" + tNascimento[1] + "-" + tNascimento[0];
          dtNascimento = new Date(tNascimento);
        }
      }
      var usuario = {
        nome: req.body.nome,
        email: req.body.email,
        tipo: 1,
        cpf: req.body.cpf,
        datanascimento: dtNascimento,
        telefone:req.body.telefone,
        telefoneddd:req.body.telefoneddd
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
            usuarioNovo = true;
          }
          oUsuario.nome = usuario.nome;
          //se o usuário é novo ou ainda não se cadastrou no sistema, então será permitido alterar o e-mail.
          if (usuarioNovo) {
            oUsuario.email = usuario.email;
          }else {
            if (!oUsuario.cadastrado) {
              oUsuario.email = usuario.email;
            }
          }
          oUsuario.cpf = usuario.cpf;
          oUsuario.datanascimento = usuario.datanascimento;
          oUsuario.telefone = usuario.telefone;
          oUsuario.telefoneddd = usuario.telefoneddd;
    
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
              oVeiculo.anomodelo = veiculo.anomodelo;
              //oVeiculo.atributos.push(atributo);              
              oVeiculo.save(err => {
                if (err) {
                  retorno.message = err.code + " " + err.message;
                  return res.json(retorno);
                }


                let ordemservicoid = req.body.ordemservicoid;
                Ordemservico.findOne({_id:ordemservicoid}                
                ).exec((err, oOrdemServico) => {
                  
                  if (err) {
                    retorno.message = err.code + " " + err.message;
                    return res.json(retorno);
                  }
                  
                  if (!oOrdemServico) {
                    oOrdemServico = new Ordemservico();
                    novaOrdemServico = true;
                  }
                  
                
                  oOrdemServico.veiculoid = oVeiculo._id;
                  oOrdemServico.usuarioid = oUsuario._id;
                  oOrdemServico.status = 1;  
                  if (finalizar){
                    oOrdemServico.status = 2;
                  }
                  
                  oOrdemServico.empresaid = req.body.empresaid;
                  oOrdemServico.quilometragem = req.body.quilometragem;
                  oOrdemServico.save((err, oOrdemServico) => {
                    if (err) {
                      retorno.message = err.code + " " + err.message;
                      return res.json(retorno);
                    }
                    //cadastrando os serviços
                    Servicorealizado.remove(
                      { ordemservicoid: oOrdemServico._id },
                      err => {
                        if (err) {
                          retorno.message = err.code + " " + err.message;
                          return res.json(retorno);
                        }
                        var servicosrealizados = [];
                        
                        for (let servicorealizado of req.body.servicorealizado) {
                          servicorealizado.veiculoid = oVeiculo._id;
                          servicorealizado.empresaid = oEmpresa._id;
                          servicorealizado.ordemservicoid = oOrdemServico._id;
                          servicosrealizados.push(servicorealizado);
                        }
                        Servicorealizado.insertMany(
                          servicosrealizados,
                          (err, docs) => {
                            if (err) {
                              retorno.message = err.code + " - " + err.message;
                              return res.json(retorno);
                            }    
                            CalculaProximasManutencoes(docs,oOrdemServico,oVeiculo);                          
                            if (usuarioNovo) {
                              new Usuarioconvidar({
                                usuarioid:oUsuario._id,
                                empresaid:req.body.empresaid
                              }).save((err,oUsuarioConvidar) => {
                                if (!err) { 
                                  if (finalizar){    
                                    //Inscricao.enviarConvite(oUsuarioConvidar._id);                                
                                    Agradecimento.enviaragradecimento(oOrdemServico._id);
                                  }
                                }
                              });
                            }else{         
                              if (finalizar){                   
                                if (finalizar){                  
                                  Agradecimento.enviaragradecimento(oOrdemServico._id);
                                }
                              }
                            }                                                    
                            retorno.success = true;
                            if (!finalizar) {
                              if (novaOrdemServico) {
                                retorno.message = "Ordem de serviço cadastrada com sucesso";
                              }else {
                                retorno.message = "Ordem de serviço atualizada com sucesso";
                              }                
                            }else{
                              retorno.message = "Ordem de serviço finalizada com sucesso";
                            }
                            return res.json(retorno);
                          }
                        );
                      }
                    );
                  });
                });
              });
            });
          });
        });
      });
    } catch (error) {
    }  
  
  });  
  return router;
};

async function CalculaProximasManutencoes(servicosrealizados,ordemservico, veiculo){  
  for (let servicoreal of servicosrealizados) {
    let servico = await Servico.findById(servicoreal.servicoid);
    if (servico.tempo) {  
      servicoreal.proximatrocadata = moment(ordemservico.data, moment.ISO_8601).add(
        servico.tempo,
        "month"
      ).toDate();
    }
    if (servico.quilometragem) {   
      servicoreal.proximatrocakm =
      parseFloat(ordemservico.quilometragem) +
      parseFloat(servico.quilometragem);  
    }
    let tiposervico = await Tiposervico.findById(servico.tiposervicoid);
    if (!tiposervico) continue;
    let tEncontrado = false;    
    if (veiculo.tiposervicos) {
      for (let cTs = 0;cTs < veiculo.tiposervicos.length;cTs++) {      
        if (veiculo.tiposervicos[cTs].tiposervicoid === tiposervico._id){
          tEncontrado = true;
          veiculo.tiposervicos[cTs].quilometragem = ordemservico.quilometragem;
          veiculo.tiposervicos[cTs].dataultimarealizacao = ordemservico.data;              
          if (servico.tempo) {  
            veiculo.tiposervicos[cTs].proximatrocadata = servicoreal.proximatrocadata;
          }
          if (servico.quilometragem) {
            veiculo.tiposervicos[cTs].proximatrocakm = servicoreal.proximatrocakm;
          }
        }
      }  
      if (!tEncontrado){          
        let oTipoServico = {};
        oTipoServico.tiposervicoid = tiposervico._id;
        oTipoServico.dataultimarealizacao = ordemservico.data;
        oTipoServico.quilometragem = ordemservico.quilometragem;
        if (servico.quilometragem) {
          oTipoServico.proximatrocakm = servicoreal.proximatrocakm;
        }
        if (servico.tempo) {
          oTipoServico.proximatrocadata = servicoreal.proximatrocadata;
        }
        veiculo.tiposervicos.push(oTipoServico);          
      }    
      servicoreal.save();
      veiculo.save(); 
    }
  }
}

// async function AtualizaTipoServico(veiculo,servicosrealizados,datacadastro,quilometragem){  
//   console.log('serviços realizados');
//   for (let servicorealizado of servicosrealizados){        
//     let servico = await Servico.findById(servicorealizado.servicoid);
//     console.log(servico);
//     let tiposervico = await Tiposervico.findById(servico.tiposervicoid);
//     if (!tiposervico) continue;
//     let tEncontrado = false;
//     for (let cTs = 0;cTs < veiculo.tiposervicos.length;cTs++) {      
//       if (veiculo.tiposervicos[cTs]._id === tiposervico._id ){
//         tEncontrado = true;
//         veiculo.tiposervicos[cTs].dataultimarealizacao = datacadastro;
//         veiculo.tiposervicos[cTs].quilometragem = quilometragem;
//       }
//     }    
//     if (!tEncontrado){
//       veiculo.tiposervicos.push({
//         tiposervicoid: tiposervico._id,
//         dataultimarealizacao : datacadastro,
//         quilometragem : quilometragem          
//       });
//     }    
//   }
//   console.log('veiculo - atualizando');
//   console.log(veiculo);
//   veiculo.save();    
// }
