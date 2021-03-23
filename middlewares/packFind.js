module.exports = function (req, res, next) {
    const id = req.header('pack-id');
    if (!id) {
        return res.status(401).send({ msg: 'Fallo en encontrar el pack solicitado' });
    }
    const packId = {
        pack: {
            id
        }
    }

    try {
        req.pack = packId.pack;
        next();
    } catch (error) {
        return res.status(401).send({ msg: 'error al obtener id del pack' });
    }
};
