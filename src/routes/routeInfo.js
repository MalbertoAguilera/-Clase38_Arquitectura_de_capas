const express = require("express");
const { Router } = express;
const router = new Router();
const {getInfoController} = require('../controllers/infoController')

router.get("/info", getInfoController);

module.exports = router;
