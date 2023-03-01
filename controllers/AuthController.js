const Users = require('../models/UserModel');
const SaldoModel = require('../models/SaldoModel');
const login = require('../use_case/auth/login');
const addUser = require('../use_case/user/addUsers')
const AuthService = require('../Services/AuthService');
const authService = AuthService();

const registerUser = (req, res, next) => {
    const { username, email, password, confPassword, firstname, lastname } = req.body;
    addUser(username, email, password, confPassword, firstname, lastname, Users, authService)
        .then((user) => {
            SaldoModel.create({
                need: 0,
                want: 0,
                invest: 0,
                saving: 0,
                idUser: user.idUser
            })
                .then((result) => res.json({ status: 200, message: "Successfully register" }))
                .catch((err) => next(err));
        })
        .catch((err) => next(err));
};

const loginUser = (req, res, next) => {
    const { username, password } = req.body
    login(username, password, Users, authService)
        .then((accessToken) => res.json({ status: 200, accessToken }))
        .catch((err) => next(err));
};

module.exports = { loginUser, registerUser }