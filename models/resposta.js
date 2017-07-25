const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const respostaporempresaSchema = new Schema({
    descricao:{type:String},    
    resposta:{type:String}
});


module.exports = mongoose.model('RespostaporEmpresa', respostaporempresaSchema);