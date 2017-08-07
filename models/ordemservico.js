const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//terá que ter uma chave unica de placa e usuário.
//Status:1 - a avaliar, 2 - avaliado
const ordemservicoSchema = new Schema({    
    veiculoid: { type: String, ref : 'Veiculo', required: [true, "Veiculo não informada"] },
    usuarioid: { type: String, ref : 'Usuario', required: [true, "Usuário não informada"] },
    empresaid: { type: String, ref : 'Empresa', required: [true, "Empresa não informada"] },
    data:{type:Date, default:Date.now()},
    status: {type:String},
    servicoRealizado:[{
      servicoid: { type: String},
    }]
});

module.exports = mongoose.model('Ordemservico', ordemservicoSchema);