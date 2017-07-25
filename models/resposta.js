///resposta  para os questionário. A resposta pertence a uma pessoa e a uma empresa.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const respostaSchema = new Schema({
    empresaid: { type: String },
    usuarioid: { type: String },
    perguntaid: { type: String },
    descricao: { type: String },
    resposta: { type: String }
});


module.exports = mongoose.model('Resposta', respostaSchema);