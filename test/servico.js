const mongoose = require("mongoose");
const config = require("../config/database");
const Veiculo = require("../models/veiculo");

const Usuario = require("../models/usuario");
const Ordemservico = require("../models/ordemservico");
const Empresa = require("../models/empresa");

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect to database', err);
    } else {
      Empresa.findById('597c84031541c104080666e4').exec((err,oEmpresa) => {
        servicos=[];        
        servico = { descricao: "Alinhamento", tempo: 6, quilometragem: 10000 };
        servicos.push(servico);
        servico = { descricao: "Balanceamento", tempo: 6, quilometragem: 10000 };
        servicos.push(servico);
        servico = { descricao: "Rodizio", tempo: 6, quilometragem: 10000 };
        servicos.push(servico);
        servico = { descricao: "Freio", tempo: 6, quilometragem: 10000 };
        servicos.push(servico);
        servico = { descricao: "Amortocedores", tempo: 12, quilometragem: 10000 };
        servicos.push(servico);
        servico = { descricao: "Troca de óleo", tempo: 12, quilometragem: 10000 };
        servicos.push(servico);
        servico = { descricao: "Troca de filtros", tempo: 12, quilometragem: 10000 };
        servicos.push(servico);
        oEmpresa.servicos = servicos;
        oEmpresa.save();
        console.log("Dados salvo com sucesso");
        return 
      });
    }
});