//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//controllers 
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

//Crear un usuario en /api/usuarios
// metodos post 
router.post("/", usuarioController.crearUsuario);

// metodos get 
router.get("/", auth, usuarioController.usuarioLogueado);
router.get("/admin", usuarioController.obtenerUsuarios)
router.get("/busqueda", usuarioController.obtenerUsuariosFiltrado)
router.get("/favorito", auth, usuarioController.favoritoGet);
// metodos put 
router.put("/", auth, usuarioController.actualizarUsuario)
router.put("/admin/usuario/:userId",  usuarioController.actualizarUsuarioAdmin)
router.put("/cartera", auth, usuarioController.actualizarCartera)
router.put("/:idProducto", auth, usuarioController.favoritosPut)


module.exports = router;
