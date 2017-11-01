"use strict";

const express = require('express');
const app = express();
const config = require("../../config/database")[app.get('env')];
const Servico = require("../../models/servico");
const Servicorealizado = require("../../models/servicorealizado");
const Atualizacao = require("../../models/atualizacao");
const Tiposervico = require("../../models/tiposervico");
const Veiculo = require("../../models/veiculo");
const Ordemservico = require("../../models/ordemservico");

const moment = require("moment");


exports.atualizaVersao = function() {

}


