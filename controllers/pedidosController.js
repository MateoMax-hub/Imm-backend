const Pedido = require('../models/pedido')
const Pack = require('../models/pack')
const Usuario = require('../models/usuario')
const { findOne } = require('../models/pack')
const { ObjectId } = require('mongoose').Types;
const nodemailer = require('nodemailer');

// Crear pedido
exports.crearPedido = async (req,res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ImmEditLeGras12@gmail.com',
            pass: 'xplxrejzuihkysvy',
        },
    });
    try {
        const user = await Usuario.findById(req.usuario.id)
        const packSoli = await Pack.findById(req.pack.id)
        const pack = await Pack.findById(req.pack.id).populate('proveedor','nombre apellido')
        const pedido = new Pedido({
            ...req.body,
            createdAt: Date.now(),
            consumidor: req.usuario.id,
            proveedor: pack.proveedor,
            pack: pack._id,
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
        await transporter.sendMail({
            from: '<ImmEditLeGras12@gmail.com>',
            to: 'max.mateo.02@gmail.com',
            subject: 'Nuevo pedido!',
            text: `Llego un nuevo pedido, estamos esperando que el consumidor envie el material de trabajo
            Consumidor:${user.nombre} ${user.apellido}
            Pack:${packSoli.titulo}
            Descripcion:${packSoli.descripcion}`,
        });
        res.send(actualizarSaldo)
    } catch (error){
        console.log(error);
    }
}

// Actualizar etapas
exports.actualizarPrimera = async (req,res) => {
    const { idPedido } = req.params
    try {
        const findPedido = await Pedido.findOne({_id: idPedido})
        const pack = await Pack.findOne({_id: findPedido.pack})
        console.log(pack);
        const user = await Usuario.findById(req.usuario.id)
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

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ImmEditLeGras12@gmail.com',
                pass: 'xplxrejzuihkysvy',
            },
        });
        await transporter.sendMail({
            from: '<ImmEditLeGras12@gmail.com>',
            to: 'max.mateo.02@gmail.com',
            subject: 'Llego material para trabajar un pedido!',
            text: `Llego un nuevo pedido y el usuario ya envio su fotografia para editar, ¡manos a la obra!
            Consumidor:${user.nombre} ${user.apellido}
            Pack:${pack.titulo}
            Descripcion:${pack.descripcion}`,
        });
        
        res.send("primera etapa actualizada con exito")
    } catch (error) {
        console.log(error);
    }
}

exports.actualizarSegunda = async (req,res) => {
    const { idPedido } = req.params
    try {
        const findPedido = await Pedido.findOne({_id: idPedido})
        
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
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ImmEditLeGras12@gmail.com',
            pass: 'xplxrejzuihkysvy',
        },
    });
    try {
        const user = await Usuario.findById(req.usuario.id)
        const findPedido = await Pedido.findOne({_id: idPedido})
        const pack = await Pack.findById(findPedido.pack)
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
        await transporter.sendMail({
            from: '<ImmEditLeGras12@gmail.com>',
            to: 'max.mateo.02@gmail.com',
            subject: 'El usuario recibio el trabajo y dejo un comentario',
            text: `Llego un nuevo pedido y el usuario ya envio su fotografia para editar, ¡manos a la obra!
            Consumidor:${user.nombre} ${user.apellido}
            Pack:${pack.titulo}
            Descripcion:${pack.descripcion}
            Comentario:${terceraEtapa.terceraEtapa.comment}`,
        });
        res.send("tercera etapa actualizada con exito")
    } catch (error) {
        console.log(error);
    }
}

// obtener pedidos del user 
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

// reembolso de pedidos 
exports.cancelarPedido = async (req,res) => {
    const { idPedido } = req.params
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ImmEditLeGras12@gmail.com',
            pass: 'xplxrejzuihkysvy',
        },
    });
    try {
        const user = await Usuario.findById(req.usuario.id)
        const pedido = await Pedido.findById(idPedido)
        const pack = await Pack.findById(pedido.pack)
        if (!pedido.consumidor.equals(req.usuario.id)){
            res.send('algo salio mal recarga la pagina y vuelve a intentarlo')
            // si el consumidor del pedido no es el mismo que el intenta hacer la cancelacion 
        }
        if (pedido.primeraEtapa.estado === "pendiente"){
            const reembolso = await Usuario.findOneAndUpdate({ _id: req.usuario.id}, {$inc: {"balance": pedido.precio}}, {new:true})
            await transporter.sendMail({
                from: '<ImmEditLeGras12@gmail.com>',
                to: 'max.mateo.02@gmail.com',
                subject: 'Cancelacion de pedido',
                text: `El usuario ${user.nombre} ${user.apellido} cancelo su pedido y se le reembolso el dinero,
                Pack cancelado: ${pack.titulo}
                Descripcion: ${pack.descripcion}`,
            });
            res.send('reembolso exitoso y cancelacion exitosos')
        }
        await pedido.remove()
        
        await transporter.sendMail({
            from: '<ImmEditLeGras12@gmail.com>',
            to: 'max.mateo.02@gmail.com',
            subject: 'Cancelacion de pedido',
            text: `El usuario ${user.nombre} ${user.apellido} cancelo su pedido pero no se le reembolso el dinero,
            Pack cancelado: ${pack.titulo}
            Descripcion: ${pack.descripcion}`,
        });
        res.send('exito')
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

// traer pedidos
exports.obtenerPedidos = async (req,res) => {
    try {
        const user = await Usuario.findById(req.usuario.id)
        if (user.rol !== "admin"){
            res.send('error')
            return
        }
        const pedidos = await Pedido.find().populate('pack','descripcion titulo').populate('consumidor', 'nombre apellido email')
        res.send(pedidos)
    } catch (error) {
        console.log(error);
    }
}