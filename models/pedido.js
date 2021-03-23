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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Pack'
        // viene de la coleccion pack 
    },
    consumidor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Usuario'
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
