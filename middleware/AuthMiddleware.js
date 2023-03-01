const jwt = require('jsonwebtoken');
const Users = require('../models/UserModel');

const AuthMiddleware = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            msg: "No token provided!"
        });
    }

    jwt.verify(token, 'MONEYBOOK_APP', async (err, decoded) => {
        try {
            req.id_user = decoded.user.id;
            const user = await Users.findAll({
                where: {
                    idUser: req.id_user
                }
            });
            if (user.length <= 0) throw Error('Unauthorized!')
            next();
        } catch (err) {
            return res.status(401).send({
                msg: "Unauthorized!"
            });
        }

    });
};
module.exports = AuthMiddleware