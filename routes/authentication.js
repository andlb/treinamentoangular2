const Usuario = require("../models/usuario");
const Usuarioconvidar = require("../models/usuarioconvidar");
const Empresa = require("../models/empresa");
const jwt = require("jsonwebtoken");
const database = require("../config/database");
const moment = require("moment");
const esquecisenha = require('../util/email/esquecisenha');

module.exports = router => {
  router.post("/esquecisenha", (req, res) => {
    const retorno = {
      success: false,
      message: "",
      codigoerro: ""
    };
    if (!req.body.email) {
      retorno.message = 'E-mail não informado'
      return res.json(retorno);
    }
    let email= req.body.email;
    Usuario.findOne({email:email}).exec((err,oUsuario)=>{
      if (err) {
        retorno.message = err.code + " - " + err.message;        
        retorno.codigoerro = '000';
        return res.json(retorno);
      }
      if ((!oUsuario) || (!oUsuario.cadastrocompleto)) {
        retorno.message = "Usuário não cadastrado";        
        retorno.codigoerro = '001';
        return res.json(retorno);        
      }
      esquecisenha.enviaEsqueciSenha(oUsuario);
      retorno.success = true;
      retorno.message = "E-mail enviado com sucesso";    
      return res.json(retorno);
    });
  })
  
  router.post("/alterarsenha", (req, res) => {
    const retorno = {
      success: false,
      message: "",
      codigoerro: ""
    };
    let decode = "";
    let userid = "";
    if (!req.body.password) {
      retorno.message = "Senha não informada";
      return res.json(retorno);
    }

    try {
      //usuário que foram cadastrado através da oficina
      //o codigo foi enviado por email e está sendo decoficado para cadastrar o usuário
      decode = jwt.verify(req.body.token, database.trocasenha);
      userid = decode.userId;
    }catch (ex) {
      retorno.message = "Assinatura inválida";
      return res.json({retorno});
    }    
    Usuario.findOne({ _id: userid }, (err, oUsuario) => {
      if (err) {
        retorno.message = err.code + " - " + err.message;
        return res.json(retorno);
      }
      if (!oUsuario) {
        retorno.message = "Usuário não encontrado";
        return res.json(retorno);
      }      
      oUsuario.password = req.body.password;
      oUsuario.save(err => {
        if (err) {
          retorno.message = err.code + ' - ' + err.message;
          return res.json(retorno);          
        }
        retorno.success = true;
        retorno.message = "Senha alterada com sucesso";
        return res.json(retorno);
      });
    });    
  });  

  router.post("/register", (req, res) => {
    let erroMsg = "";
    if (!req.body.email) {
      if (erroMsg != "") erroMsg != ",";
      erroMsg += " o e-mail ";
    }
    if (!req.body.password) {
      if (erroMsg != "") erroMsg != ",";
      erroMsg += " a senha ";
    }
    if (erroMsg != "") {
      erroMsg = "Por favor, preencha o(s) seguinte(s) campos: " + erroMsg;
      res.json({
        success: false,
        message: erroMsg
      });
    } else {
      let decoded = "";
      let email = "";
      if (req.body.token) {
        try {
          //usuário que foram cadastrado através da oficina
          //o codigo foi enviado por email e está sendo decoficado para cadastrar o usuário
          decode = jwt.verify(req.body.token, database.segredoemail);
          email = decode.email;
        }catch (ex) {
          erroMsg = "Assinatura inválida";
          return res.json({
            success: false,
            message: erroMsg
          });        
        }
      }else{
        //quando o email é cadastrado pelo usuário.
        email = req.body.email.toLowerCase();  
      }
      Usuario.findOne({ email: email }, (err, oUsuario) => {
        if (err) {
          erroMsg = err.code + " - " + err.message;
          return res.json({
            success: false,
            message: erroMsg
          });          
          //se tiver token e usuário, gerar erro;
          if (req.body.token) {
            if (oUsuario) {  
              erroMsg = "Usuário já cadastrado.";
              return res.json({
                success: false,
                message: erroMsg
              });              
            }
          }
        }        
        //se tiver token e o usuário não foi encontrado, gerar erro
        if (!oUsuario) {
          if (req.body.token) {
            erroMsg = "Usuário não encontrado.";
            return res.json({
              success: false,
              message: erroMsg
            });
          }
          oUsuario = new Usuario();            
        }
        oUsuario.password = req.body.password;
        oUsuario.email = req.body.email.toLowerCase();
        oUsuario.tipo = req.body.tipo;
        oUsuario.cadastrado = true;
        oUsuario.datacadastro = new Date();
/*
    cadastrado: { type: Boolean, default: false },
    datacadastro:{type:Date},
*/        
        oUsuario.save(err => {
          if (err) {
            if (err.code === 11000) {
              res.json({
                success: false,
                message: "Usuário já cadastrado"
              });
            }
            if (err.errors) {
              if (err.errors.email) {
                return res.json({
                  success: false,
                  message: err.errors.email.message
                });
              }
              if (err.errors.password) {
                return res.json({
                  success: false,
                  message: err.errors.password.message
                });
              }
            }              
            return res.json({
              success: false,
              message: err.code + ' - ' + err.message
            });              
          }
          if (req.body.token) {
            Usuarioconvidar.remove({
              usuarioid:oUsuario._id
            });
          }
          return res.json({
            success: true,
            message: "Usuário salvo"
          });                        
        });
        
      });
    }
  });

  //Login do sistema.
  router.post("/login", (req, res) => {
    const retorno = {
      success: false,
      message: "",
      token: ""
    };
    let mensagem = "";
    if (!req.body.email) {
      if (mensagem != "") mensagem += ",";
      mensagem += " o e-mail ";
    }
    if (!req.body.password) {
      if (mensagem != "") mensagem += ",";
      mensagem += " a senha ";
    }
    if (mensagem != "") {
      retorno.message = "Por favor, preencha os seguintes campos: " + mensagem;
      res.json(retorno);
      return;
    }

    Usuario.findOne({
      email: req.body.email
    })
      .populate("empresa")
      .exec((err, user) => {
        if (err) {
          retorno.message = err.code + " - " + err.message;
          return res.json(retorno);
        } else {
          if (!user) {
            retorno.message = "Usuário não encontrado";
            return res.json(retorno);
          } else {
            const validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
              retorno.message = "Senha incorreta";
              return res.json(retorno);
            } else {
              const token = jwt.sign(
                {
                  userId: user._id
                },
                database.secret,
                {
                  expiresIn: "15h"
                }
              );
              var empresanome = "";
              if (user.empresa) {
                empresanome = user.empresa.nomefantasia;
              }
              retorno.success = true;
              retorno.message = "Success";
              retorno.token = token;
              retorno.user = {
                usuarioid: user._id,
                usuarionome:user.nome,
                email: user.email,
                tipo: user.tipo,
                empresa: user.empresa,
                cadastrocompleto: user.cadastrocompleto,
                empresanome: empresanome
              };
              return res.json(retorno);
            }
          }
        }
        res.json(retorno);
        return;
      });
  });

  router.get("/checkEmailUsuario/:email", (req, res) => {
    const retorno = {
      success: false,
      message: ""
    };
    if (!req.params.email) {
      retorno.message = "e-mail não fornecido";
      res.json(retorno);
      return;
    }
    Usuario.findOne(
      {
        email: req.params.email,
        cadastrado:true
      },
      (err, user) => {
        if (err) {
          retorno.message = err;
        } else {
          if (user) {
            retorno.message = "Usuário já cadastrado";
          } else {
            retorno.success = true;
            retorno.message = "Usuário disponível";
          }
        }
        res.json(retorno);
        return;
      }
    );
  });

  /********************************************
  middleware: usado para pegar o token do cabeçalho
  ********************************************/
  router.use((req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      res.json({
        success: false,
        message: "Token não fornecido"
      });
    } else {
      //verifica se o token é valido      
      jwt.verify(token, database.secret, (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            tokeninvalido:true,
            message: "Token inválido"
          });
        } else {
          //cria uma variavel global para ser utilizada em todas as proximas requisições.
          req.decoded = decoded;
          next();
        }
      });
    }
  });

  router.get("/getUsuario/:usuarioid", (req, res) => {
    const retorno = {
      success: false,
      message: "",
      usuario: null
    };
    if (!req.params.usuarioid) {
      retorno.message = "Código do usuário não definido";
      return res.json(retorno);
    }
    Usuario.findOne({
      _id: req.params.usuarioid
    })
      .populate("empresa")
      .exec((err, user) => {
        if (err) {
          retorno.mensagem = err;
          return res.json(retorno);
        }
        if (!user) {
          retorno.mensagem = "Usuario não encontrado";
          return res.json(retorno);
        }
        var empresaid = "";
        var empresanome = "";
        if (user.empresa) {
          empresaid = user.empresa;
          empresanome = user.empresa.nomefantasia;
        }
        retorno.usuario = {
          usuarioid: req.params.usuarioid,
          nome: user.nome,
          sexo: user.sexo,
          cpf: user.cpf,
          dtnascimento: moment(user.datanascimento).format("DD/MM/YYYY"),
          email: user.email,
          bairro: user.endereco.bairro,
          estado: user.endereco.estado,
          cidade: user.endereco.cidade,
          cep: user.endereco.cep,
          empresaid: empresaid,
          empresanome: empresanome
        };
        return res.json(retorno);
      });
  });

  router.post("/editProfile", (req, res) => {
    const retorno = {
      success: false,
      message: ""
    };
    if (!req.body.usuarioid) {
      retorno.message = "Código do usuário não informado";
      return res.json(retorno);
    }
    if (!req.body.nome) {
      retorno.message = "Nome não informado ";
      return res.json(retorno);
    }
    if (!req.body.cpf) {
      retorno.message = "CPF não informado ";
      return res.json(retorno);
    }
    Usuario.findOne(
      {
        _id: req.body.usuarioid
      },
      (err, user) => {
        if (err) {
          retorno.mensagem = err;
          return res.json(retorno);
        }
        if (!user) {
          retorno.mensagem = "Usuario não encontrado";
          return res.json(retorno);
        }
        user.nome = req.body.nome;
        user.cpf = req.body.cpf;
        user.sexo = req.body.sexo;
        user.tipo = 0;
        user.datanascimento = moment(req.body.dtnascimento, "DD/MM/YYYY");
        user.cadastrocomplemento = 1;
        user.endereco = {
          bairro: req.body.bairro,
          estado: req.body.estado,
          cidade: req.body.cidade,
          cep: req.body.cep
        };

        user.save(err => {
          if (err) {
            res.json({ success: false, message: err }); // Return error message
          } else {
            res.json({ success: true, message: "Dados salvo com sucesso" }); // Return success message
          }
        });
      }
    );
  });

  return router;
};