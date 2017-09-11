///TODO: Terminar a definição dos serviçõs.

///Esquema dos serviços que a empresa presta.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const servicoSchema = new Schema({
    empresaid: { type: String, ref:'Empresa', index:true},
    descricao: { type: String },
    tempo: { type: Number },
    quilometragem: { type: Number },

});
module.exports = mongoose.model('Servico', servicoSchema);