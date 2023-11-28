const Users = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const Pocket = require("../models/PocketModel");
const Saldo = require("../models/SaldoModel");
const Transaction = require("../models/TransactionModel");

const findByIdUser = require("../use_case/user/findByIdUser");
const findById = require("../use_case/user/findById");
// const backupData = require('../use_case/user/backupData');
const fs = require("fs");
const { promisify } = require("util");
const { join } = require("path");
const glob = require("glob");

const fetchUserByIdUser = (req, res, next) => {
  findByIdUser()
    .findUser(req.id_user, Users)
    .then((user) => res.json(user))
    .catch((err) => next(err));
};

const fetchSaldoByIdUser = (req, res, next) => {
  findByIdUser()
    .findSaldo(req.id_user, Saldo)
    .then((saldo) => res.json(saldo))
    .catch((err) => next(err));
};

const fetchTransactionByIdUser = (req, res, next) => {
  findByIdUser()
    .findTransaction(req.id_user, Transaction)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
const fetchCategoryByIdUser = (req, res, next) => {
  findByIdUser()
    .findCategory(req.id_user, Category)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};
const fetchPocketByIdUser = (req, res, next) => {
  findByIdUser()
    .findCategory(req.id_user, Pocket)
    .then((result) => res.json(result))
    .catch((err) => next(err));
};

const fetchCategoryById = (req, res, next) => {
  const idCategory = req.params.id;
  console.log(idCategory);
  findById()
    .findCategoryById(req.id_user, idCategory, Category)
    .then((category) => {
      if (!category) {
        const notFoundError = new Error("Category not found");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      res.json(category);
    })
    .catch((err) => next(err));
};
const fetchPocketById = (req, res, next) => {
  const idPocket = req.params.id;
  findById()
    .findPocketById(req.id_user, idPocket, Pocket)
    .then((pocket) => {
      if (!pocket) {
        const notFoundError = new Error("Pocket Doesn't Exist");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      return res.json(pocket);
    })
    .catch((err) => next(err));
};

const fetchTransactionById = (req, res, next) => {
  const idTransaction = req.params.id;
  findById()
    .findTransactionById(req.id_user, idTransaction, Transaction)
    .then((result) => {
      if (!result) {
        const notFoundError = new Error("Transaction Doesn't Exist");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      return res.json(result);
    })
    .catch((err) => next(err));
};

const backupDataByIdUser = async (req, res, next) => {
  try {
    const result = await findByIdUser().findTransaction(
      req.id_user,
      Transaction,
      Category
    );

    if (!result) {
        const notFoundError = new Error("You don't have data to backup");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      const jsonString = JSON.stringify(result, null, 2);
      return res.json(jsonString);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  fetchUserByIdUser,
  fetchTransactionByIdUser,
  fetchCategoryByIdUser,
  fetchPocketByIdUser,
  fetchSaldoByIdUser,
  fetchCategoryById,
  fetchPocketById,
  fetchTransactionById,
  backupDataByIdUser,
};
