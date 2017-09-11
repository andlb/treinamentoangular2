const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const usuarioconvidarSchema = new Schema({
    usuarioid: { type:String,ref: 'Usuario',required:true },
    empresaid:{type:String, ref : 'Empresa',required:true},
    datainscricao:{type:Date},
    dataproximoenvio:{type:Date, default:Date.now(), index:true},
    dataultimoenvio:{type:Date}
});

module.exports = mongoose.model('Usuarioconvidar', usuarioconvidarSchema);