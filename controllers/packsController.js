const Pack = require('../models/pack')
const Favoritos = require('../models/favoritos')

exports.crearPack = async (req,res) => {
    const packExistance = await Pack.find({proveedor: req.usuario.id})
    try {
        if (packExistance.length < 3) {
            const pack = new Pack({
                ...req.body,
                proveedor: req.usuario.id
            })
            await pack.save()
            res.json(pack)
        } else {
            res.send('ya tienes el maximo de packs permitidos')
        }
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerPacks = async (req,res) => {
    const { idProveedor } = req.params
    const packs = await Pack.find({proveedor: idProveedor})
    res.send(packs)
}

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