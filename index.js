const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/database')[app.get('env')];
const authentication = require('./routes/authentication')(router);
const empresas = require('./routes/empresas')(router);
const ordemservico = require('./routes/ordemservico')(router);
const proprietario = require('./routes/proprietario')(router);

const bodyParser = require('body-parser')
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect to database', err);
    } else {
        console.log('connected to database : ' + config.db);
    }
});
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});


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