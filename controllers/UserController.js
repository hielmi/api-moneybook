const Users = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const Pocket = require("../models/PocketModel");
const Saldo = require("../models/SaldoModel");
const Transaction = require("../models/TransactionModel");

const findByIdUser = require("../use_case/user/findByIdUser");
const findById = require("../use_case/user/findById");
const restoreData = require("../use_case/user/restoreData");
const Debt = require("../models/DebtModel");
const { response } = require("../utils/response");

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

const fetchDebtByIdUser = (req, res, next) => {
  findByIdUser()
    .findDebt(req.id_user, Debt)
    .then((result) => response(res, 200, result, "success"))
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

const fetchDebtById = (req, res, next) => {
  const idDebt = req.params.id;
  findById()
    .findDebtById(req.id_user, idDebt, Debt)
    .then((result) => {
      if (!result) {
        const notFoundError = new Error("Debt Doesn't Exist");
        notFoundError.statusCode = 404;
        throw notFoundError;
      }
      response(res, 200, result, "success");
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
    return res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const restoreDataByIdUser = async (req, res, next) => {
  try {
    const data = req.file.buffer.toString("utf-8");

    const result = await restoreData(req.id_user, data, Transaction);

    if (result) {
      return res
        .status(200)
        .json({ message: "Data inserted into the database successfully" });
    } else {
      const error = new Error("Failed to insert data into the database");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid JSON file" });
  }
};

module.exports = {
  fetchUserByIdUser,
  fetchTransactionByIdUser,
  fetchCategoryByIdUser,
  fetchPocketByIdUser,
  fetchSaldoByIdUser,
  fetchDebtByIdUser,
  fetchCategoryById,
  fetchPocketById,
  fetchTransactionById,
  fetchDebtById,
  backupDataByIdUser,
  restoreDataByIdUser,
};
