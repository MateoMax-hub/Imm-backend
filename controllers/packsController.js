const Pack = require('../models/pack')

exports.crearPack = async (req,res) => {

    const packExistance = await Pack.find({proveedor: req.usuario.id})
    try {
        if (packExistance.length < 3) {
            const pack = new Pack({
                ...req.body,
                proveedor: req.usuario.id
            })
            await pack.save()
            res.send('exito')
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