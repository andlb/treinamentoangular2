const Empresa = require("../models/empresa");
const Servico = require("../models/servico");
module.exports = router => {
  router.get("/getTodasEmpresas", (req, res) => {
    let retorno = { success: false, message: "", empresas: undefined };
    Empresa.find(
      {},
      { nomeresponsavel: 1, nomefantasia: 1, celular: 1 },
      (err, empresas) => {
        if (err) {
          retorno.message = err;
          res.json(retorno);
          return;
        }
        if (!empresas) {
          retorno.message = "Empresas não encontrada";
          res.json(retorno);
          return;
        }
        retorno.success = true;
        retorno.empresas = empresas;

        res.json(retorno);
      }
    );
  });

  router.get("/getEmpresa/:id", (req, res) => {
    let retorno = { success: false, message: "", empresas: undefined };
    if (!req.params.id) {
      message: "Não foi fornecido o ID da empresa";
      res.json(retorno);
    }
    Empresa.findOne({ _id: req.params.id }, (err, empresa) => {
      if (err) {
        retorno.message = err;
        res.json(retorno);
        return;
      }
      if (!empresa) {
        retorno.message = "Empresas não encontrada";
        res.json(retorno);
        return;
      }
      Servico.find({empresaid:empresa._id},(err,servicos) => {
        if (err) {
          retorno.message = err.code + ' - '+ err.message;
          return res.json(retorno);    
        }
        retorno.success = true;
        retorno.empresa = empresa;
        retorno.servicos = servicos;
        return res.json(retorno);
      });      
    });
  });

  router.post("/updateEmpresa", (req, res) => {
    let retorno = { success: false, message: "" };
    let erroMsg = "";
    let atualizacao = 0;
    if (req.body.id) {
      atualizacao = 1;
    }

    if (!req.body.nomeresponsavel) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o nome do responsável";
    }

    if (!req.body.razaosocial) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " a razão social";
    }

    if (!req.body.nomefantasia) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o nome fantasia ";
    }

    if (!req.body.email) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o e-mail ";
    }

    if (!req.body.celular) {
      if (erroMsg !== "") erroMsg += ",";
      erroMsg += " o celular ";
    }

    if (erroMsg != "") {
      retorno.message =
        "Por favor, preencha o(s) seguinte(s) campos: " + erroMsg;
      res.json(retorno);
      return;
    }

    /**/
    if (atualizacao) {
      Empresa.find({ _id: req.body.id }, (err, empresa) => {
        if (err) {
          retorno.message =
            "Empresa não encontrada e por isso não foi atualizada";
          return res.json(retorno);
        }
        if (!empresa[0]) {
          retorno.message =
            "Empresa não encontrada e por isso não foi atualizada";
          return res.json(retorno);
        }
        empresa = empresa[0];
        empresa.nomeresponsavel = req.body.nomeresponsavel;
        empresa.nomefantasia = req.body.nomefantasia;
        empresa.razaosocial = req.body.razaosocial;
        empresa.email = req.body.email;
        empresa.telefone = req.body.telefone;
        empresa.celular = req.body.celular;
        empresa.endereco = {
          endereco: req.body.endereco,
          bairro: req.body.bairro,
          complemento: req.body.complemento,
          cidade: req.body.cidade,
          estado: req.body.estado,
          CEP: req.body.CEP
        };
        empresa.convidados = req.body.convidado;
        //empresa.servicos = req.body.servico;
        empresa.perguntas = req.body.pergunta;
        //TODO: Verificar como passar o usuário através dos parametros.
        //TODO: Verificar se o usuário tem acesso para alterar a informação.
        //empresa.respUltimaAlteracao.push({})
        empresa.save((err, empresa) => {
          if (err) {
            retorno.message = "Erro desconhecido. Atualização não realizada";
            return res.json(retorno);
          } else {
            servicos = req.body.servico;
            Servico.remove({empresaid:empresa._id},(err) =>{
              if (err) {
                retorno.message = err.code + " - " + err.message;
                return res.json(retorno);
              }else{
                servicos = [];
                if (!req.body.servico.length) {
                  retorno.success = true;
                  retorno.message = "Empresa atualizada com sucesso";
                  return res.json(retorno);
                }                
                for (c=0; c<req.body.servico.length;c++){
                  servico = req.body.servico[c];
                  servico.empresaid = empresa._id;
                  servicos.push(servico);
                }                
                Servico.insertMany(servicos, (err, docs) => {
                  if (err) {
                    retorno.message = err.code + " - " + err.message;
                    return res.json(retorno);
                  }
                  retorno.success = true;
                  retorno.message = "Empresa atualizada com sucesso";
                  res.json(retorno);
                });
              }
            })
          }
        });
      });
    }
    //fim da atualização
    //cadastro da empresa na base de dados
    const empresa = new Empresa({
      nomeresponsavel: req.body.nomeresponsavel,
      nomefantasia: req.body.nomefantasia,
      razaosocial: req.body.razaosocial,
      email: req.body.email,
      telefone: req.body.telefone,
      celular: req.body.celular,
      endereco: {
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        cidade: req.body.cidade,
        estado: req.body.estado,
        CEP: req.body.CEP
      },
      convidados: req.body.convidado,
      perguntas: req.body.pergunta,
      respUltimaAlteracao: [
        {
          usuario: null,
          Data: Date.now()
        }
      ]
    });
    empresa.save((err,empresa) => {
      if (err) {
        retorno.message = "Erro desconhecido. Atualização não realizada";
        return res.json(retorno);
      } else {
        servicos = [];
        if (!req.body.servico.length) {
          retorno.success = true;
          retorno.message = "Empresa atualizada com sucesso";
          return res.json(retorno);
        }

        for (c=0; c<req.body.servico.length;c++){
          servico = req.body.servico[c];
          servico.empresaid = empresa._id;
          servicos.push(servico);
        }

        Servico.insertMany(servicos, (err, docs) => {
          if (err) {
            retorno.message = err.code + " - " + err.message;
            return res.json(retorno);
          }
          retorno.success = true;
          retorno.message = "Empresa atualizada com sucesso";
          return res.json(retorno);
        });
      }
    });
  });

  router.get("/checkEmailEmpresa/:email", (req, res) => {
    const retorno = {
      success: false,
      message: ""
    };
    if (!req.params.email) {
      retorno.message = "e-mail não fornecido";
      res.json(retorno);
      return;
    }
    Empresa.findOne(
      {
        email: req.params.email
      },
      (err, empresa) => {
        if (err) {
          retorno.message = err;
        } else {
          if (empresa) {
            retorno.message = "Empresa já cadastrado";
          } else {
            retorno.success = true;
            retorno.message = "Empresa disponível";
          }
        }
        res.json(retorno);
        return;
      }
    );
  });

  return router;
};
