const Pedido = require('../models/pedido')
const Pack = require('../models/pack')
const Usuario = require('../models/usuario')
const { findOne } = require('../models/pack')

exports.crearPedido = async (req,res) => {

    const pack = await Pack.findById(req.pack.id)
    console.log();
    try {
        const pedido = new Pedido({
            ...req.body,
            createdAt: Date.now(),
            consumidor: req.usuario.id,
            proveedor: pack.proveedor,
            packData: pack.descripcion,
            precio: pack.precio
        })
        const packPrecio = pack.precio * -1
        const consumidor = await Usuario.findOne({_id: req.usuario.id}).select('balance')
        if (consumidor.balance + packPrecio < 0){
            res.send('saldo insuficiente')
            return
        }
        const actualizarSaldo = await Usuario.findOneAndUpdate({_id: req.usuario.id},{$inc: {"balance": packPrecio}}, {new:true}).select('_id balance nombre apellido')
        await pedido.save()
        res.send(actualizarSaldo)
    } catch (error){
        console.log(error);
    }
}