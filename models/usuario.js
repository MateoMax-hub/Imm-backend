const mongoose = require('mongoose');

const Usuario = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    imagen: {
        type: String
    },
    rol: {
        type: String,
        default: "usuario"
    },
    balance: {
        type: Number,
        default: 0
    },
    estadoCuenta: {
        type: String,
        default: "normal"
    },
    favorito: {
        id:{
            type: mongoose.Schema.Types.ObjectId
        }
    }
})

module.exports = mongoose.model('usuario', Usuario)