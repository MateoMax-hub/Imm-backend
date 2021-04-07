const Consulta = require('../models/consulta');
const Usuario = require('../models/usuario')

exports.consultaPost = async (req, res) => {
    //const user = await Usuario.findById(req.user.id).populate('proveedor','nombre apellido')
    const usuarioConsultor = await Usuario.findOne({_id: req.usuario.id});
    try {
        const consulta = new Consulta({
            ...req.body,
            createdAt: Date.now(),
            nombre: usuarioConsultor.nombre,
            apellido: usuarioConsultor.apellido
        });
        await consulta.save();
        res.send(consulta);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error en post de consulta');
    }
};

exports.consultaGet = async (req, res) => {
    try {
        const consulta = await Consulta.find();
        res.send(consulta);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error en get de consulta');
    }
};
