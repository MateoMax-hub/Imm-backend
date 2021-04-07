//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//controllers 
const consultaController = require("../controllers/consultaController");
const auth = require("../middlewares/auth");

// metodos post 
router.post("/", auth, consultaController.consultaPost);
// metodos get 
router.get("/", auth, consultaController.consultaGet);


module.exports = router;
