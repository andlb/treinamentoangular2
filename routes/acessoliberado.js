const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const database = require('../config/database');
module.exports = (router) => {
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
  
  return router;
}