const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult, body } = require('express-validator');
const jwt = require('jsonwebtoken');

// Register de user 
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

// login de user 
exports.usuarioLogueado = async (req, res) => {
    const usuarioEncontrado = await Usuario.findById(req.usuario.id).select('-__v -password');
    res.send(usuarioEncontrado);
};

// cambio de contraseña 
exports.actualizarUsuario = async (req, res) => {
    try {
        const { body, usuario } = req;
        if (body.password) {
            const salt = await bcryptjs.genSalt(10);
            const encryptedPass = await bcryptjs.hash(body.password, salt);
            body.password = encryptedPass;
        }
        const usuarioActualizado = await Usuario.findOneAndUpdate({ _id: usuario.id}, body, {new:true});
        res.send(usuarioActualizado);
    } catch (error) {
        console.log(error);
    }
}

// depositar o extraer de cartera 
exports.actualizarCartera = async (req, res) => {
    try{
        const { body, usuario } = req;
        if (body.balance){
            const balanceActualizado = await Usuario.findOneAndUpdate({ _id: usuario.id}, {$inc: {"balance": body.balance}}, {new:true});
            res.send(balanceActualizado);
        }
    } catch (error) {
        console.log(error);
    }
}

// obtener todos los users para pag admin 
exports.obtenerUsuarios = async (req, res) => {
    const users = await Usuario.find().select('-__v -imagen');
    res.send(users);
}

// actualizar datos de user desde admin 
exports.actualizarUsuarioAdmin = async (req, res) => {
    try {
        const { body } = req;
        const { userId } = req.params;
        console.log(body);
        const usuarioActualizado = await Usuario.findOneAndUpdate({ _id: userId}, body, {new:true});
        res.send(usuarioActualizado);
    } catch (error) {
        console.log(error);
    }
}

// traer users desde la busqueda el land page 
exports.obtenerUsuariosFiltrado = async (req,res) => {
    const users = await Usuario.find().select('rol estadoCuenta nombre apellido');
    const usersFiltrados = await users.filter((u) => u.nombre.toLowerCase().includes(req.body.filtro.toLowerCase()) 
    || u.apellido.toLowerCase().includes(req.body.filtro.toLowerCase()));
    res.send(usersFiltrados);
}

exports.favoritosPut = async (req,res) => {
    const { idProducto } = req.params
    try {
        const user = await Usuario.findById(req.usuario.id)
        const favExist = user.favorito.find((p) => p.pack == idProducto)
        const operador = favExist?'$pull':'$push'
        var pack = {pack:idProducto}
        const final = await Usuario.findOneAndUpdate({_id:req.usuario.id},{[operador]:{favorito:pack}}, {new:true})
        res.send(final)
    } catch (error) {
        console.log(error);
    }
}

exports.obtenerFavoritos = async (req,res) => {
    try {
        const user = await Usuario.findById(req.usuario.id).populate('favorito.pack','titulo precio descripcion imagen').select('favorito.-_id _id createdAt balance nombre apellido email imagen rol')
        res.send(user)
    } catch (error) {
        console.log(error);
    }
}

exports.tokenValidator = async (req,res) => {
    try {
        res.send(req.usuario.validState)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

exports.adminValidation = async (req,res) => {
    try {
        const isAdmin = await Usuario.findById(req.usuario.id)
        if (isAdmin.rol === 'admin'){
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (error) {
        console.log(error);
    }
}