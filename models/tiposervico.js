const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const tiposervicoSchema = new Schema({
    _id: Number,
    descricao: { type: String },
    ativo:{type:Boolean,default:true}
});
module.exports = mongoose.model('Tiposervico', tiposervicoSchema);