///Esquema dos serviços que a empresa presta.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const agendamentoSchema = new Schema({        
    placa: { type: String, index:true },
    data:{type: Date, default: Date.now()}
});
module.exports = mongoose.model('Agendamento', agendamentoSchema);