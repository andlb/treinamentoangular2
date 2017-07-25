/// Serviços que foram realizados no veiculo ao longo da história dele.
/// O serviço pertence a um veiculo. Caso o proprietário troque de veiuclo, 
/// outro veiculo será criado e os serviços novos passam a a pertencer a esse novo veiculo.

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const veiculoSchema = new Schema({
    veiculoid: { type: String, required: [true, "Veiculo não definido"] },
    servicoid: { type: String, required: [true, 'Serviço não definido'] },
    empresa: { type: String, required: [true, "Empresa não definida"] },
    timestamp: { type: Timestamp }

});
module.exports = mongoose.model('Veiculo', veiculoSchema);