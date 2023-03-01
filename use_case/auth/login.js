const { Op } = require('sequelize');

const login = (username, password, UsersModel, authService) => {
    if (!username || !password) {
        const error = new Error('email and password fields cannot be empty');
        error.statusCode = 401;
        throw error;
    }
    return UsersModel.findAll({
        where: {
            [Op.or]: [
                { username: username },
                { email: username }
            ]
        }
    }).then((user) => {
        if (!user.length) {
            const error = new Error("Username or email doesn't exists");
            error.statusCode = 401;
            throw error;
        }
        const isMatch = authService.compare(password, user[0].password);
        if (!isMatch) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }
        const payload = {
            user: {
                id: user[0].idUser
            }
        };
        return authService.generateToken(payload);
    });
}

module.exports = login 