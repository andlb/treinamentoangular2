const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/database')[app.get('env')];
const agendamento = require('./routes/agendamento')(router);
const authentication = require('./routes/authentication')(router);
const empresas = require('./routes/empresas')(router);
const ordemservico = require('./routes/ordemservico')(router);
const proprietario = require('./routes/proprietario')(router);

const Usuario = require("./models/usuario");
const bodyParser = require('body-parser')
const correcaoservico = require("./util/correcao/service");
const numeral = require('numeral');
const registranumeral = require('./util/registranumeral');
const cors = require('cors');
const jwt = require("jsonwebtoken");

mongoose.Promise = global.Promise;

let options = {};
console.log('Ambiente');
console.log(app.get('env'));

if (app.get('env') === "production") {
    let decode = jwt.verify(config.acessobd, config.segredoemail);
    let userid = decode.user;
    let pass = decode.pass;    
    options = {
        user:userid,
        pass:pass
    };    
}

mongoose.connect(config.uri,options, (err) => {
    if (err) {
        console.log('could not connect to database', err);
    } else {
        console.log('connected to database : ' + config.db);
    }
});

correcaoservico.atualizaVersao();
registranumeral.registraNumeral();

if (app.get('env') === "production") {
    var corsOptions = {
        origin: 'http://youkar.com.br',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
    }
    app.use(cors());    
}else {
    if (app.get('env') === "development") {
        app.use(cors({ origin: 'http://localhost:4200' }));
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use("/agendamento", agendamento);
app.use("/authentication", authentication);
app.use("/empresa", empresas);
app.use("/ordemservico", ordemservico);
app.use("/proprietario", proprietario);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('ouvindo a porta '+ PORT);
});