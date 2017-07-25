const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const database = require('../config/database');

module.exports = (router) => {
  router.post('/register', (req, res) => {
    //  req.body.email
    // req.body.username;
    // req.body.password;
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
        password: req.body.password
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
    Usuario.findOne({email: req.body.email}, (err, user) => {
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
              email: user.email
            };
          }
        }
      }
      res.json(retorno);
      return;
    });
  });

  router.post('/editProfile', (req, res) => {
    const retorno = {
      success: false,
      message: ''
    };
    if (!req.params.userid) {
      retorno.message = 'Código do usuário não definido';
      res.json(retorno);
      return;
    }
    if (!req.params.nome) {
      retorno.message = 'Nome não definido ';
      res.json( retorno );
      return;
    }
    Usuario.findOne( { _id:req.params.userid },(err,user)=>{
      if (err) {
        retorno.mensagem = err;
        res.json( retorno );
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
        complemento : req.body.complemento,
        estado : req.body.estado,
        cep : req.body.cep
      }
    })
    
  });

  router.get('/checkEmail/:email', (req, res) => {
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
  })  

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



  return router;
}