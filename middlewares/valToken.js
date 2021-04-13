const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send({ msg: 'Fallo autenticacion de token' });
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        const val = {
            token: {
                validState: true
            }
        }
        req.usuario = val.token
        next();
    } catch (error) {
        const val = {
            token: {
                validState: false
            }
        }
        req.usuario = val.token
        next();
    }
};
