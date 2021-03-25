const Pedido = require('../models/pedido')
const Pack = require('../models/pack')
const Usuario = require('../models/usuario')
const { findOne } = require('../models/pack')
const { ObjectId } = require('mongoose').Types;


// Crear pedido
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

// Actualizar pedido primera etapa
exports.actualizarPrimera = async (req,res) => {
    const { idPedido } = req.params
    try {
        const findPedido = await Pedido.findOne({_id: idPedido})
        if (!findPedido.consumidor.equals(req.usuario.id)){
            res.send('algo salio mal recargue la pagina y vuelva a intentarlo')
            return
        }
        const primeraEtapa = {
            primeraEtapa: {
                img: req.body.primeraEtapa.img,
                estado: "completada",
                at: Date.now()
            }
        }
        const primeraEtapaUpdate = await Pedido.findOneAndUpdate({ _id: idPedido }, primeraEtapa, { new: true })
        res.send("primera etapa actualizada con exito")
    } catch (error) {
        console.log(error);
    }
}

exports.actualizarSegunda = async (req,res) => {
    const { idPedido } = req.params
    try {
        const findPedido = await Pedido.findOne({_id: idPedido})
        if (!findPedido.proveedor.equals(req.usuario.id)){
            res.send('algo salio mal recargue la pagina y vuelva a intentarlo')
            return
        }
        const segundaEtapa = {
            segundaEtapa: {
                img: req.body.segundaEtapa.img,
                estado: "completada",
                at: Date.now()
            }
        }
        const segundaEtapaUpdate = await Pedido.findOneAndUpdate({ _id: idPedido }, segundaEtapa, { new: true })
        res.send("primera etapa actualizada con exito")
    } catch (error) {
        console.log(error);
    }
}

exports.actualizarTercera = async (req,res) => {
    const { idPedido } = req.params
    try {
        const findPedido = await Pedido.findOne({_id: idPedido})
        if (!findPedido.consumidor.equals(req.usuario.id)){
            res.send('algo salio mal recargue la pagina y vuelva a intentarlo')
            return
        }
        const terceraEtapa = {
            terceraEtapa: {
                comment: req.body.terceraEtapa.comment,
                estado: "completada",
                at: Date.now()
            }
        }
        const terceraEtapaUpdate = await Pedido.findOneAndUpdate({ _id: idPedido }, terceraEtapa, { new: true })
        res.send("primera etapa actualizada con exito")
    } catch (error) {
        console.log(error);
    }
}