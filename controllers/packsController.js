const Pack = require('../models/pack');
const Pedido = require('../models/pedido');
const Usuario = require('../models/usuario');

exports.crearPack = async (req, res) => {
    const packExistance = await Pack.find({ proveedor: req.usuario.id });
    try {
        if (packExistance.length < 3) {
            const pack = new Pack({
                ...req.body,
                proveedor: req.usuario.id,
            });
            await pack.save();
            res.send('exito');
        } else {
            res.send('ya tienes el maximo de packs permitidos');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.obtenerPacks = async (req, res) => {
    const { idProveedor } = req.params;
    const packs = await Pack.find({ proveedor: idProveedor });
    res.send(packs);
};

exports.obtenerAdminPacks = async (req, res) => {
    try {
        const user = await Usuario.findById(req.usuario.id);
        if (user.rol !== 'admin') {
            res.send('no sos admin flaco');
            return;
        }
        const packs = await Pack.find();
        res.send(packs);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

exports.actualizarPacks = async (req, res) => {
    try {
        const { idPack } = req.params;
        const user = await Usuario.findById(req.usuario.id);
        if (user.rol !== 'admin') {
            res.send('no sos admin flaco');
            return;
        }
        const changePack = await Pack.findOneAndUpdate({ _id: idPack }, req.body, { new: true });
        res.send('listo flaco')
    } catch (error) {
        console.log(error);
    }
};

exports.obtenerPacksTodos = async (req,res) => {
    try {
        const packs = await Pack.find()
        res.send(packs)
    } catch (error) {
        console.log(error)
        res.status(400).send('No hay packs disponibles al publico')
    }
}

exports.deletePack = async (req,res) => {
    const { packId } = req.params
    try {
        const pack = await Pack.findById(packId)
        await pack.remove()
        res.send('exito')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error eliminar en pack')
    }
}

exports.deletePackValidation = async (req,res) => {
    try {
        const pedido = await Pedido.findOne({pack: req.body._id})
        if (pedido){
            res.send(true)
            return
        } else {
            res.send(false)
            return
        }
    } catch (error) {
        console.log(error);
    }
}