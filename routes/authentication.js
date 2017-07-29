const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const jwt = require('jsonwebtoken');
const database = require('../config/database');

module.exports = (router) => {
  router.post('/register', (req, res) => {
    let erroMsg = ""
    if (!req.body.email) {
      if (erroMsg != "") erroMsg != ","
      erroMsg += " o e-mail "
    }
    if (!req.body.password) {
      if (erroMsg != "") erroMsg != ","
      erroMsg += " a senha "
    }
    if (erroMsg != "") {
      erroMsg = "Por favor, preencha o(s) seguinte(s) campos: " + erroMsg
      res.json({
        success: false,
        message: erroMsg
      });
    } else {
      let user = new Usuario({
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        tipo: req.body.tipo
      });
      user.save((err) => {
        if (err) {
          if (err.code === 11000) {
            res.json({
              success: false,
              message: "Usuário já cadastrado"
            });
          } else {
            if (err.errors) {
              if (err.errors.email) {
                res.json({
                  success: false,
                  message: err.errors.email.message
                });
                return;
              }

              if (err.errors.password) {
                res.json({
                  success: false,
                  message: err.errors.password.message
                });
                return;
              }
              res.json({
                success: false,
                message: err
              });
              return;
            } else {
              res.json({
                success: false,
                message: "Usuário não pode ser salvo",
                err
              });
              return;
            }
          }
          console.log("Erro> UserJs:" + err);
        } else {
          res.json({
            success: true,
            message: "Usuário salvo"
          });
        }
      });
    }
  });

  //Login do sistema.
  router.post('/login', (req, res) => {
    const retorno = {
      success: false,
      message: '',
      token: ''
    };
    let mensagem = ""
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
    }, (err, user) => {
      if (err) {
        retorno.message = err;
      } else {
        if (!user) {
          retorno.message = "Usuário não encontrado";
        } else {
          const validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            retorno.message = "Senha incorreta";
          } else {
            const token = jwt.sign({
              userId: user._id
            }, database.secret, {
              expiresIn: '15m'
            })
            retorno.success = true;
            retorno.message = "Success";
            retorno.token = token;
            retorno.user = {
              usuarioid: user._id,
              email: user.email,
              tipo: user.tipo,
              cadastrocompleto: user.cadastrocompleto
            };
          }
        }
      }
      res.json(retorno);
      return;
    });
  });

  router.get('/checkEmailUsuario/:email', (req, res) => {
    const retorno = {
      success: false,
      message: ''
    };
    if (!req.params.email) {
      retorno.message = 'e-mail não fornecido';
      res.json(retorno);
      return;
    }
    Usuario.findOne({
      email: req.params.email
    }, (err, user) => {
      if (err) {
        retorno.message = err;
      } else {
        if (user) {
          retorno.message = 'Usuário já cadastrado';
        } else {
          retorno.success = true;
          retorno.message = "Usuário disponível"
        }
      }
      res.json(retorno);
      return;
    });
  });

  router.get('/checkEmailEmpresa/:email', (req, res) => {
    const retorno = {
      success: false,
      message: ''
    };
    if (!req.params.email) {
      retorno.message = 'e-mail não fornecido';
      res.json(retorno);
      return;
    }
    Empresa.findOne({
      email: req.params.email
    }, (err, empresa) => {
      if (err) {
        retorno.message = err;
      } else {
        if (empresa) {
          retorno.message = 'Empresa já cadastrado';
        } else {
          retorno.success = true;
          retorno.message = "Empresa disponível"
        }
      }
      res.json(retorno);
      return;
    });
  });

  router.post('/cadastraEmpresa',(req,res)=>{
    let retorno = {success:false, message:''};
    let erroMsg = ""
    if (!req.body.nomeresponsavel){
      if (erroMsg !== "") erroMsg += ","
      erroMsg += " o nome do responsável"
    }

    if (!req.body.razaosocial){
      if (erroMsg !== "") erroMsg += ","
      erroMsg += " a razão social"
    }

    if (!req.body.nomefantasia){
      if (erroMsg !== "") erroMsg += ","
      erroMsg += " o nome fantasia "
    }

    if (!req.body.email){
      if (erroMsg !== "") erroMsg += ","
      erroMsg += " o e-mail "
    }

    if (!req.body.celular){
      if (erroMsg !== "") erroMsg += ","
      erroMsg += " o celular "
    }
    
    if (erroMsg != "") {
      retorno.message = "Por favor, preencha o(s) seguinte(s) campos: " + erroMsg
      res.json(retorno);  
      return;
    } 

    const empresa = new Empresa({
      nomeresponsavel:req.body.nomeresponsavel,
      nomefantasia:req.body.nomefantasia,
      razaosocial:req.body.razaosocial,
      email:req.body.email, 
      telefone:req.body.telefone,
      celular:req.body.celular,  
      endereco:{
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        cidade: req.body.cidade,
        estado: req.body.estado,
        CEP: req.body.CEP
      },
      convidados:req.body.convidado,
      servicos:req.body.servico,
      respUltimaAlteracao:[{
        usuario: null,
        Data: Date.now()
      }]
    });  

    empresa.save((err) => {      
      if (err) {
        retorno.message = err;        
      }else{
        retorno.success = true;
        retorno.message = 'Empresa cadastrada com sucesso';        
      }
      res.json(retorno);  
    });
  });
  
  /********************************************
  middleware: usado para pegar o token do cabeçalho
  ********************************************/
  router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      res.json({
        success: false,
        message: 'Token não fornecido'
      });
    } else {
      //verifica se o token é valido
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            message: 'Token inválido'
          });
        } else {
          //cria uma variavel global para ser utilizada em todas as proximas requisições.
          req.decoded = decoded;
          next()
        }

      });

    }
  });

  router.get('/getUsuario', (req, res) => {
    const retorno = {
      success: false,
      message: '',
      usuario:null
    };
    if(!req.params.usuarioid){
      retorno.message = "Código do usuário não definido";
      res.json(retorno);
      return;
    }
    Usuario.findOne({
      _id: req.body.userid
    }, (err, user) => {
      if (err) {
        retorno.mensagem = err;
        res.json(retorno);
        return;
      }
      if (!user) {
        retorno.mensagem = "Usuario não encontrado"
        res.json(retorno);
        return;
      } 
      retorno.usuario = {
        nome:user.nome,        
        endereco:user.endereco.endereco,
        bairro:user.endereco.bairro,
        numero:user.endereco.numero,
        complemento:user.endereco.complemento,
        estado:user.endereco.estado,
        cep:user.endereco.cep        
      }
      res.json(retorno);
    });
  });

  router.post('/editProfile', (req, res) => {
    const retorno = {
      success: false,
      message: ''
    };
    if (!req.body.userid) {
      retorno.message = 'Código do usuário não definido';
      res.json(retorno);
      return;
    }
    if (!req.body.nome) {
      retorno.message = 'Nome não definido ';
      res.json(retorno);
      return;
    }
    Usuario.findOne({
      _id: req.body.userid
    }, (err, user) => {
      if (err) {
        retorno.mensagem = err;
        res.json(retorno);
        return;
      }
      if (!user) {
        retorno.mensagem = "Usuario não encontrado"
        res.json(retorno);
        return;
      }
      user.nome = req.body.nome;
      user.tipo = 0
      user.cadastrocomplemento = 1
      user.endereco = {
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        estado: req.body.estado,
        cep: req.body.cep
      }
      user.save((err)=>{
        if (err) {
          res.json({ success: false, message: err }); // Return error message
        } else {
          res.json({ success: true, message: 'Dados cadastrados com sucesso' }); // Return success message
        }        
      });

    })
  });



  return router;
}