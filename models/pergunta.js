    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;
    const perguntaSchema = new Schema({
        empresaid: { type: String },
        descricao: { type: String },
        tipo: { type: Number },
        resposta: { type: String }
    });

    module.exports = mongoose.model('Resposta', respostaSchema);