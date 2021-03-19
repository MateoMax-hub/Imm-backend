const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).send({ msg: errores.array() });
    }

    const { email, password } = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({ email });
        if (usuarioEncontrado) {
            return res.status(400).send('Correo en uso.');
        }

        const salt = await bcryptjs.genSalt(10);
        const encryptedPass = await bcryptjs.hash(password, salt);

        const usuario = new Usuario({
            ...req.body,
            createdAt: Date.now(),
            password: encryptedPass,
        });
        await usuario.save();

        const payload = {
            usuario: {
                id: usuario._id,
            },
        };
        jwt.sign(payload, process.env.SECRETA, { expiresIn: 3600 }, (error, token) => {
            if (error) {
                throw error;
            }
            res.send(token);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al crear usuario.');
    }
};
exports.usuarioLogueado = async (req, res) => {
    const usuarioEncontrado = await Usuario.findById(req.usuario.id).select('-__v -password');
    res.send(usuarioEncontrado);
};
exports.actualizarUsuario = async (req, res) => {
    try {
        const { body, usuario } = req;
        if (body.password) {
            const salt = await bcryptjs.genSalt(10);
            const encryptedPass = await bcryptjs.hash(body.password, salt);
            body.password = encryptedPass;
        }
        const usuarioActualizado = await Usuario.findOneAndUpdate({ _id: usuario.id}, body, {new:true})
        res.send(usuarioActualizado)
    } catch (error) {
        console.log(error);
    }
}
exports.actualizarCartera = async (req, res) => {
    try{
        const { body, usuario } = req;
        if (body.balance){
            const balanceActualizado = await Usuario.findOneAndUpdate({ _id: usuario.id}, {$inc: {"balance": body.balance}}, {new:true})
            res.send(balanceActualizado)
        }
    } catch (error) {
        console.log(error);
    }
}
exports.obtenerUsuarios = async (req, res) => {
    const users = await Usuario.find().select('-__v')
    res.send(users)
}