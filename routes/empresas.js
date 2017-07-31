const Empresa = require('../models/empresa');
//const database = require('../config/database');

 module.exports = (router) => {

  router.get('/getTodasEmpresas',(req,res)=>{
    let retorno = {success:false, message:'', empresas:undefined};
    console.log(retorno);
    Empresa.find({},{nomeresponsavel:1,nomefantasia:1,celular:1},(err,empresas) => {
      if (err) {
        retorno.message = err;
        res.json(retorno);
        return;
      }
      if (!empresas){
        retorno.message = "Empresas não encontrada";
        res.json(retorno);
        return;        
      }
      retorno.message = "Empresas encontradas com sucesso";
      retorno.success = true;      
      retorno.empresas = empresas;

      res.json(retorno);
    })

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