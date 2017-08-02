const Veiculo = require('../models/veiculo');
const Usuario = require('../models/usuario');

module.exports = (router) => {
  router.post('/updateOficina', (req, res) => {
    let retorno = {
      success: false,
      message: ''
    };
    let erroMsg = "";
    if (!req.body.placa) {
      if (erroMsg !== "") erroMsg += ","
      erroMsg = " a placa "
    }

    if (!req.body.email) {
      if (erroMsg !== "") erroMsg += ","
      erroMsg = " o e-mail "
    }

    if (!req.body.nome) {
      if (erroMsg !== "") erroMsg += ","
      erroMsg = " o nome "
    }

    if (!req.body.cpf) {
      if (erroMsg !== "") erroMsg += ","
      erroMsg = " o cpf "

    }
    if (erroMsg) {
      retorno.message = "Os seguintes campos deve ser preenchidos: " + erroMsg;
      res.json(retorno);
      return retorno;
    }

    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      tipo: 1,
      cpf: req.body.cpf
    });
    usuario.save(
      (err) => {
        if (err) {
          retorno.message = err;
          console.log("err" + err)
          res.json(retorno);
        }
        const veiculo = new Veiculo({
          usuarioid: usuario._id,
          marca: req.body.marca,
          modelo: req.body.modelo,
          placa: req.body.placa,
          ano: req.body.ano,
          anoModelo: req.body.anoModel
        })
        veiculo.save(err1 => {
          if (err1) {
            if (err1.code === "11000") retorno.message = "E-mail já cadastrado na base de dados";
            retorno.message = err1.code + " - " + err1.errmsg;
            res.json(retorno);
          } else {
            retorno.success = true;
            retorno.message = 'Dados gravados com sucesso';
            res.json(retorno);
          }
        })
      });
  });

  return router;
}