const Pack = require('../models/pack')

exports.crearPack = async (req,res) => {
    const packExistance = await Pack.find({proveedor: req.usuario.id})
    try {
        if (packExistance.length < 3) {
            console.log('no existe el pack');
            const pack = new Pack({
                ...req.body,
                proveedor: req.usuario.id
            })
            await pack.save()
            res.json(pack)
        } else {
            console.log('existe el pack');
            res.send('exito not')
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