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
    if (!req.body.quilometragem) {
      if (erroMsg !== "") erroMsg += ","
      erroMsg = " a quilometragem "      
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

  router.get('/pesquisaplaca/:placa', (req, res) => {

    let retorno = {
      success: false,
      message: '',
      veiculo: undefined,
      usuario: undefined
    };
    return res.json(retorno);
    if (!req.params.placa) {
      message: 'Não foi informado a placa';
      return res.json(retorno);
      
    }
    Veiculo.find({
      placa: req.params.placa
    }, (err, veiculo) => {
      if (err) {
        retorno.message = err.code + " " + err.message;
        res.json(retorno);
        return;
      }
      usuarioid = veiculo[0].usuarioid;
      Usuario.find({
        _id: usuarioid
      }, (errUsuario, usuario) => {
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
    }).sort({
      _id: 1
    });
    if (!req.params.placa) {
      message: 'Placa não encontrada';
      res.json(retorno);
      return;
    }
  });

  router.get('/getTodosVeiculos/:empresaid/:usuarioid', (req, res) => {
    let retorno = {
      success: false,
      message: '',
      veiculos: [{}]
    };
    if (!req.params.empresaid) {
      retorno.message = "Empresa não informada";
      return res.json(retorno);

    }
    if (!req.params.usuarioid) {
      retorno.message = "Usuário não informado";
      return res.json(retorno);
    }

    //var promiseVeic = Veiculo.find({}, {placa: 1, usuarioid: 1 }).cursor();      


    /******************************/
    //TODO: Pesquisa por periodo veiculo e status.      
    //valida se o usuário pertence a emrpesa
    Usuario.findOne({
      _id: req.params.usuarioid
    }, {
      empresa: 1
    }, (err, usuario) => {
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
        retorno.message = "Sem acesso para acessar essa empresa "
        return res.json(retorno);
      }
      //TODO: Pesquisa por periodo veiculo e status.
      //pesquisas os veiculos.
      Veiculo.find({},{placa:1,usuarioid:1}).populate('usuarioid',['nome']).exec((err, veiculos) => {
        if (err) {
          retorno.message = err.code + " " + err.message;
          return res.json(retorno);
        }
        if (!veiculos) {
          retorno.message = 'Nenum veiculo foi encontrado'
          return res.json(retorno);
        }                   
        retorno.veiculos = veiculos;
        return res.json(retorno);
      });
    });
  });
  return router;
}