const Veiculo = require('../models/veiculo');
const Usuario = require('../models/usuario');


module.exports = (router) => {
  "use strict"
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
    let atributos = [];
    if (req.body.quilometragem) {
      atributo = {
        quilometragem: req.body.quilometragem,
        data: Date.now()
      };
    }
    atributos.push(atributo);
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
          anoModelo: req.body.anomodel,
          atributos: atributos
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

  router.get('/pesquisaplaca/:placa',(req,res)=>{
    let retorno = {success:false, message:'',veiculo:undefined,usuario:undefined};       
    if (!req.params.placa) {
      message:'Não foi informado a placa';
      res.json(retorno);
      return;
    }
    Veiculo.find({placa: req.params.placa},(err,veiculo) => {
      if (err) {
        retorno.message = err.code + " " + err.message;
        res.json(retorno);
        return;
      }
      Usuario.find({_id: veiculo.usuarioid},(errUsuario,usuario) => {
        if (errUsuario) {
          retorno.message = err.code + " " + err.message;
          res.json(retorno);
          return;          
        }
        retorno.success = true;
        retorno.veiculo = veiculo;
        retorno.proprietario = usuario;
        res.json(retorno);
        return;
      });
    });
    if (!req.params.placa) {
      message:'Placa não encontrada';
      res.json(retorno);
      return;
    }    
  });

  return router;
}