const Users = require('../models/UserModel');
const Category = require('../models/CategoryModel');
const Pocket = require('../models/PocketModel')
const Saldo = require('../models/SaldoModel')
const Transaction = require('../models/TransactionModel');

const findByIdUser = require('../use_case/user/findByIdUser');
const findById = require('../use_case/user/findById');

const fetchUserByIdUser = (req, res, next) => {
    findByIdUser().findUser(req.id_user, Users)
        .then((user) => res.json(user))
        .catch((err) => next(err))
}

const fetchSaldoByIdUser = (req, res, next) => {
    findByIdUser().findSaldo(req.id_user, Saldo)
        .then((saldo) => res.json(saldo))
        .catch((err) => next(err));
}

const fetchTransactionByIdUser = (req, res, next) => {
    findByIdUser().findTransaction(req.id_user, Transaction, Category)
        .then((result) => res.json(result))
        .catch((err) => next(err))
}
const fetchCategoryByIdUser = (req, res, next) => {
    findByIdUser().findCategory(req.id_user, Category)
        .then((result) => res.json(result))
        .catch((err) => next(err))
}
const fetchPocketByIdUser = (req, res, next) => {
    findByIdUser().findCategory(req.id_user, Pocket)
        .then((result) => res.json(result))
        .catch((err) => next(err))
}

const fetchCategoryById = (req, res, next) => {
    const idCategory = req.params.id;
    console.log(idCategory);
    findById().findCategoryById(req.id_user, idCategory, Category)
        .then((category) => {
            if (category === null) {
                return res.json({ status: 200, message: "Category Doesn't Exist" })
            }
            res.json(category)
        })
        .catch((err) => next(err))
}
const fetchPocketById = (req, res, next) => {
    const idPocket = req.params.id;
    findById().findPocketById(req.id_user, idPocket, Pocket)
        .then((pocket) => {
            if (pocket !== null) {
                return res.json(pocket)
            }
            res.json({ status: 400, message: "Pocket Doesn't Exist" })
        })
        .catch((err) => next(err))
}

const fetchTransactionById = (req, res, next) => {
    const idTransaction = req.params.id;
    findById().findTransactionById(req.id_user, idTransaction, Transaction)
        .then((result) => {
            if (result !== null) {
                return res.json(result)
            }
            res.json({ status: 400, message: "Transaction Doesn't Exist" })
        })
}

module.exports = {
    fetchUserByIdUser,
    fetchTransactionByIdUser,
    fetchCategoryByIdUser,
    fetchPocketByIdUser,
    fetchSaldoByIdUser,
    fetchCategoryById,
    fetchPocketById,
    fetchTransactionById
}