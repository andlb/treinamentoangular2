const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const veiculoSchema = new Schema({
    fabricante: { type: String },
    modelo: { type: String },
    placa: { type: String },
    ano: { type: String },
    anoModelo: { type: String },
    atributos: [{
        data: { type: Date },
        quilometragem: { type: Number }
    }]
});

module.exports = mongoose.model('Veiculo', veiculoSchema);