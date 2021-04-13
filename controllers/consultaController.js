const Consulta = require('../models/consulta');
const Usuario = require('../models/usuario')

exports.consultaPost = async (req, res) => {
    try {
        const consulta = new Consulta({
            ...req.body,
            createdAt: Date.now(),
            usuario: req.usuario.id
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
        const consulta = await Consulta.find().populate('usuario','nombre apellido email')
        res.send(consulta);
    } catch (error) {
        console.log(error);
        res.status(400).send('Error en get de consulta');
    }
};
