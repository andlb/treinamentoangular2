///TODO: Criar uma rotina de transferência de propriedade do carro. 
///Hoje um carro pertence a um proprietário. Quando esse caso passa a pertecer a outro proprietário, 
///o histório do carro começa do zero. Por isso, deve ter uma rotina que possibilite fazer essa transferencia.

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
//terá que ter uma chave unica de placa e usuário.
const veiculoSchema = new Schema({    
    usuarioid: { type: String, ref:"Usuario", required: [true, "Usuário não definido"] },
    marca: { type: String },
    modelo: { type: String },
    placa: { type: String, required: [true, "Placa não definida"], unique: true, uppercase: true  },
    ano: { type: String },
    anomodelo: { type: String },
    atributos: [{
        data: { type: Date },
        quilometragem: { type: Number }
    }]
});

module.exports = mongoose.model('Veiculo', veiculoSchema);