const express = require('express');
const router = express.Router();
//controllers 
const packsController = require('../controllers/packsController')
const auth = require("../middlewares/auth");

// metodos get 
router.get("/", auth, packsController.obtenerAdminPacks)
router.get("/:idProveedor", packsController.obtenerPacks)

// metodos post 
router.post("/", auth, packsController.crearPack)
router.post("/delete", packsController.deleteValidator)

// metodos put 
router.put("/:idPack", auth, packsController.actualizarPacks)

// metodos delete
router.delete("/:idPack", auth, packsController.deletePacks)

module.exports = router;
