//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//controllers 
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

//Crear un usuario en /api/usuarios
router.post("/", usuarioController.crearUsuario);
router.get("/", auth, usuarioController.usuarioLogueado);
router.put("/", auth, usuarioController.actualizarUsuario)
router.put("/cartera", auth, usuarioController.actualizarCartera)

module.exports = router;
