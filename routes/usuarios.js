//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//controllers 
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");
const valToken = require("../middlewares/valToken");

//Crear un usuario en /api/usuarios
// metodos post 
router.post("/", usuarioController.crearUsuario);
router.post("/valToken", valToken, usuarioController.tokenValidator)

// metodos get 
router.get("/", auth, usuarioController.usuarioLogueado);
router.get("/admin", usuarioController.obtenerUsuarios)
router.get("/busqueda", usuarioController.obtenerUsuariosFiltrado)
router.get("/usuarioFav", auth, usuarioController.obtenerFavoritos)
router.get("/admin/val", auth, usuarioController.adminValidation)

// metodos put 
router.put("/", auth, usuarioController.actualizarUsuario)
router.put("/admin/usuario/:userId",  usuarioController.actualizarUsuarioAdmin)
router.put("/cartera", auth, usuarioController.actualizarCartera)
router.put("/:idProducto", auth, usuarioController.favoritosPut)


module.exports = router;
