const express = require('express');
const router = express.Router();
//controllers 
const packsController = require('../controllers/packsController')
const auth = require("../middlewares/auth");

// metodos get 
router.get("/:idProveedor", packsController.obtenerPacks)
router.get("/favorito/:idProveedor", packsController.obtenerFavoritos)
router.get("/", packsController.obtenerPacksTodos)
// metodos post 
router.post("/", auth, packsController.crearPack)
router.post("/favorito", auth, packsController.favoritosPost)

// metodos delete 
router.delete("/:packId", auth, packsController.deletePack)

module.exports = router;
