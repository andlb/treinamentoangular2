const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//terá que ter uma chave unica de placa e usuário.
//Status:0 - deletado, 1 - a avaliar, 2 - finalizado
const ordemservicoSchema = new Schema({    
    veiculoid: { type: String, index:true, ref : 'Veiculo', required: [true, "Veiculo não informada"] },
    usuarioid: { type: String, index:true, ref : 'Usuario', required: [true, "Usuário não informada"] },
    empresaid: { type: String, index:true, ref : 'Empresa', required: [true, "Empresa não informada"] },
    data:{type:Date, default:Date.now()},
    status: {type:String},
    quilometragem:{ type: String,  required: [true, "Quilometragem não informada"] },
});
ordemservicoSchema.index({ veiculoid: 1, usuarioid: -1 }); // schema level
module.exports = mongoose.model('Ordemservico', ordemservicoSchema);