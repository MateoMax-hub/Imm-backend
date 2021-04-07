const mongoose = require('mongoose')

const Consulta = mongoose.Schema({
    nombre:{
        type: String
    },
    apellido:{
        type: String
    },
    titulo:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('consulta', Consulta)