    
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const perguntaSchema = new Schema({    
  empresaid:{type:String},
  descricao:{type:String},
  tipo:{type:Number},
  resposta:{type:String}
});

module.exports = mongoose.model('Resposta', respostaSchema);