/// Serviços que foram realizados no veiculo ao longo da história dele.
/// O serviço pertence a um veiculo. Caso o proprietário troque de veiuclo, 
/// outro veiculo será criado e os serviços novos passam a a pertencer a esse novo veiculo.

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const servicorealizadoSchema = new Schema({
    veiculoid: { type: String, ref: 'Veiculo', index: true, required: [true, "Veiculo não definido"] },
    servicoid: { type: String, ref:'Servico', required: [true, 'Serviço não definido'] },
    empresaid: { type: String, ref:'Empresa', required: [true, "Empresa não definida"] },
    ordemservicoid: {type:String, ref:'Ordemservico', index: true, required: [true,'Ordem de serviço não informada']},
    timestamp: { type: Date, default: Date.now() },
    observacao: { type: String },
    proximatrocadata: { type: Date},
    proximatrocakm: { type: Number}
});

module.exports = mongoose.model('Servicorealizado', servicorealizadoSchema);