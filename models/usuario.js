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
    edad: {
        type: Number,
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
    }
})

module.exports = mongoose.model('usuario', Usuario)