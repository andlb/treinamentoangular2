
const mongoose = require('mongoose');
const config = require('./config/database');
const Veiculo = require('./models/veiculo');

const Usuario = require('./models/usuario');
const Ordemservico = require('./models/ordemservico');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect to database', err);

    } else {
        //cadastrar veiculo, usuario e empresa.
        console.log('connected to database : ' + config.db);
        Veiculo.remove({},err => {
            Ordemservico.remove({}, err => {
                //cadastrar veiculo
                for (c=0;c<10;c++) {
                    placa = "AAA-101"+c
                    veiculo = {
                        usuarioid:'598369586e64a13c788bae5d' ,
                        placa:placa ,
                    }
                    new Veiculo(veiculo).save((err,veiculo) => {
                        if (veiculo) {
                            console.log('veiculo'+veiculo);
                            ordemservico = {
                                veiculoid: veiculo._id,
                                usuarioid: '598369586e64a13c788bae5d',
                                empresaid: '597c84031541c104080666e4',
                                data:Date.now(),
                            }
                            new Ordemservico(ordemservico).save();

                        }
                    });
                }                
            });
        } );
        

    }
});