const express = require('express');
const router = express.Router();
//controllers 
const packsController = require('../controllers/packsController')
const auth = require("../middlewares/auth");

// metodos get 
router.get("/:idProveedor", packsController.obtenerPacks)

// metodos post 
router.post("/", auth, packsController.crearPack)

// metodos put 

module.exports = router;
