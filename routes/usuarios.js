//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//controllers 
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

//Crear un usuario en /api/usuarios
router.post("/", usuarioController.crearUsuario);
router.get("/", auth, usuarioController.usuarioLogueado);

module.exports = router;
