//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
//Controllers 
const auth = require("../controllers/authController");

//Validar usuario en /api/auth
router.post("/", auth.login);

module.exports = router;
