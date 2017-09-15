const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//terá que ter uma chave unica de placa e usuário.
//Status:0 - deletado, 1 - a avaliar, 2 - finalizado
const configurationSchema = new Schema({    
  emailsecret: { type: String},
  emailtoken: { type: String}
});
module.exports = mongoose.model('Configuration', configurationSchema);