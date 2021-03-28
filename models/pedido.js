const mongoose = require('mongoose')

const Pedido = mongoose.Schema({
    packData: {
        type: String,
        required: true,
        trim: true,
        ref: 'Pack'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    precio: {
        type: Number,
        required: true,
        ref: 'Pack'
        // viene de la coleccion pack 
    },
    proveedor: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true
        },
        nombre: {
            type: String,
            trim: true
        },
        apellido: {
            type: String,
            trim: true
        },
        // viene de la coleccion pack 
    },
    consumidor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'usuario'
        // viene del token del post
    },
    primeraEtapa: {
        img:{type:String},
        at:{type:Date},
        estado:{type:String, default:"pendiente"}
    },
    segundaEtapa: {
        img:{type:String},
        at:{type:Date},
        estado:{type:String, default:"pendiente"}
    },
    terceraEtapa: {
        comment:{type:String, default:""},
        at:{type:Date},
        estado:{type:String, default:"pendiente"}
    }
})

module.exports = mongoose.model('pedido', Pedido)
