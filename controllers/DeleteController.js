// model
const UserModel = require('../models/UserModel');
const PocketModel = require('../models/PocketModel');
const CategoryModel = require('../models/CategoryModel');
const SaldoModel = require('../models/SaldoModel');
const TransactionModel = require('../models/TransactionModel');

// usecase
const deleteRecord = require('../use_case/delete/delete');

const deleteUser = (req, res, next) => {
    deleteRecord().User(req.id_user, UserModel, SaldoModel, CategoryModel, PocketModel, TransactionModel)
        .then((result) => {
            if (result[0] >= 1) {
                return res.json({ status: 200, message: "Successfully delete User " })
            } else {
                const error = new Error(`Failed to delete User with id ${req.id_user}`);
                error.statusCode = 400;
                throw error;
            }
        }).catch((err) => next(err));
}

const deleteCategory = (req, res, next) => {
    const idCategory = req.params.id;
    deleteRecord().Category(req.id_user, idCategory, CategoryModel)
        .then((result) => {
            if (result >= 1) {
                return res.json({ status: 200, message: "Successfully delete Category" });
            } else {
                const error = new Error('Failed to delete Category')
                error.statusCode = 400;
                throw error;
            }
        }).catch((err) => next(err));
}

const deletePocket = (req, res, next) => {
    const idPocket = req.params.id;
    deleteRecord().Pocket(req.id_user, idPocket, PocketModel)
        .then((result) => {
            if (result >= 1) {
                return res.json({ status: 200, message: "Successfully delete Pocket" });
            } else {
                const error = new Error('Failed to delete Pocket')
                error.statusCode = 400;
                throw error;
            }
        })
}
module.exports = { deleteUser, deleteCategory, deletePocket }
