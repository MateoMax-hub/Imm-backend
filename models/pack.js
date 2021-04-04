const mongoose = require('mongoose')

const Pack = mongoose.Schema({
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
    precio:{
        type: Number,
        required: true,
        trim: true
    },
    proveedor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    imagen:{
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('pack', Pack)