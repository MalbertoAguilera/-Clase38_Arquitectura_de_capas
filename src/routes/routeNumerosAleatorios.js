const express = require("express");
const {Router} = express;
const route = new Router();
const {getNumerosAleatoriosController} = require('../controllers/numerosAleatoriosController')

route.get("/api/randoms", getNumerosAleatoriosController);

module.exports = route;