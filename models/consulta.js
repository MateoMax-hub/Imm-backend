const mongoose = require('mongoose')

const Consulta = mongoose.Schema({
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
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "usuario"
    }
})

module.exports = mongoose.model('consulta', Consulta)