///Lembrete dos serviços que precisam ser realizados novamente no carro

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const veiculoSchema = new Schema({
    veiculoid: { type: String, required: [true, "Veiculo não definido"] },
    servicoid: { type: String, required: [true, 'Serviço não definido'] },
    empresa: { type: String, required: [true, "Empresa não definida"] },
    data: { type: Date, default: Date.now() },
    tempoUltimoAviso: { type: Date }, ///quando for gerado o serviço esse campo terá o mesmo valor que a data.
    proximoAviso: { type: Date }, ///da do proximo aviso.
});
module.exports = mongoose.model('Veiculo', veiculoSchema);