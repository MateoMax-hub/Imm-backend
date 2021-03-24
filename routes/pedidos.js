const express = require('express');
const router = express.Router();
//controllers 
const pedidosController = require('../controllers/pedidosController')
const auth = require("../middlewares/auth");
const packFind = require("../middlewares/packFind");

// metodos get 

// metodos post 
router.post("/", auth, packFind, pedidosController.crearPedido)

// metodos put 

module.exports = router;
