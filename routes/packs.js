const express = require('express');
const router = express.Router();
//controllers 
const packsController = require('../controllers/packsController')
const auth = require("../middlewares/auth");

// metodos get 
router.get("/:idProveedor", packsController.obtenerPacks)
router.get("/", packsController.obtenerPacksTodos)
// metodos post 
router.post("/", auth, packsController.crearPack)
// metodos delete 
router.delete("/:packId", auth, packsController.deletePack)

module.exports = router;
