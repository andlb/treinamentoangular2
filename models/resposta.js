///resposta  para os questionário. A resposta pertence a uma pessoa e a uma empresa.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const respostaSchema = new Schema({
    ordemservicoid: {type: String, index:true, ref: 'Ordemservico'},
    perguntaid: { type: String },
    tipo: { type: String },
    descricao: { type: String },
    resposta: { type: String }
});
module.exports = mongoose.model('Resposta', respostaSchema);