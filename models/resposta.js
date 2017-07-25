const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const respostaSchema = new Schema({
    empresaid: { type: String },
    perguntaid: { type: String },
    descricao: { type: String },
    resposta: { type: String }
});


module.exports = mongoose.model('Resposta', respostaSchema);