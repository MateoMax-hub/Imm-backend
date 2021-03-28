const Pedido = require('../models/pedido')
const Pack = require('../models/pack')
const Usuario = require('../models/usuario')
const { findOne } = require('../models/pack')
const { ObjectId } = require('mongoose').Types;


// Crear pedido
exports.crearPedido = async (req,res) => {

    try {
        const pack = await Pack.findById(req.pack.id).populate('proveedor','nombre apellido')
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
        res.send("segunda etapa actualizada con exito")
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
        res.send("tercera etapa actualizada con exito")
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerPedidosUser = async (req,res) => {
    try {
        const userRol = await Usuario.findOne({_id:req.usuario.id})
        if (userRol.rol === "admin"){
            const pedidos = await Pedido.find({proveedor: req.usuario.id})
            if (pedidos.length === 0) {
                const pedidosC = await Pedido.find({consumidor: req.usuario.id})
                res.send(pedidosC)
                return
            }
            res.send(pedidos)
            return
        }
        if (userRol.rol === "consumidor"){
            const pedidos = await Pedido.find({consumidor: req.usuario.id})
            res.send(pedidos)
        } else {
            const pedidos = await Pedido.find({proveedor: req.usuario.id})
            res.send(pedidos)
        }
    } catch (error) {
        console.log(error);
    }
}

exports.cancelarPedido = async (req,res) => {
    const { idPedido } = req.params
    try {
        const pedido = await Pedido.findById(idPedido)
        if (!pedido.consumidor.equals(req.usuario.id)){
            res.send('algo salio mal recarga la pagina y vuelve a intentarlo')
            // si el consumidor del pedido no es el mismo que el intenta hacer la cancelacion 
        }
        if (pedido.primeraEtapa.estado === "pendiente"){
            const reembolso = await Usuario.findOneAndUpdate({ _id: req.usuario.id}, {$inc: {"balance": pedido.precio}}, {new:true})
            res.send('reembolso exitoso y cancelacion exitosos')
        }
        await pedido.remove()
        res.send('exito')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}