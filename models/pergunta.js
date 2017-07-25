///as perguntas que uma empresa irá realizar.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const perguntaSchema = new Schema({
    empresaid: { type: String },
    descricao: { type: String },
    tipo: { type: Number },
    resposta: { type: String },
    ativo: { type: Boolean }
});

module.exports = mongoose.model('Resposta', respostaSchema);