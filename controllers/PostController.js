// model
const Category = require("../models/CategoryModel");
const Transaction = require("../models/TransactionModel");
const Saldo = require("../models/SaldoModel");
const Pocket = require("../models/PocketModel");
const Debt = require("../models/DebtModel");

// usecase
const getCountPocket = require("../use_case/user/getCountPocket");
const add = require("../use_case/post/add");
const { response, errResponse } = require("../utils/response");

const addTransaction = (req, res, next) => {
  const { type, amount, note, date, id_category } = req.body;
  add()
    .Transaction(
      req.id_user,
      type,
      amount,
      note,
      date,
      id_category,
      Transaction,
      Saldo,
      Category
    )
    .then((result) => response(res, 201, result, `Succesfully added ${type}`))
    .catch((err) => next(err));
};

const addCategory = (req, res, next) => {
  try {
    const { iconCategory, nameCategory, budgeting } = req.body;
    const budget = [
      "need",
      "want",
      "saving",
      "invest",
      "50/30/20",
      "70/10/10/10",
    ];
    if (!budget.includes(budgeting)) {
      const error = new Error(`something error`);
      error.statusCode = 400;
      error.customMessage = "Budget value is not valid";
      throw error;
    }
    add()
      .Category(req.id_user, iconCategory, nameCategory, budgeting, Category)
      .then((data) => response(res, 201, data, "Succesfully added category"))
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};

const addPocket = (req, res, next) => {
  const { namePocket, targetAmount, amount } = req.body;
  Saldo.findOne({
    attributes: ["saving"],
    where: {
      idUser: req.id_user,
    },
  })
    .then((result) => {
      const { saving } = result;
      if (saving < 0) {
        const error = new Error(`saldo saving minus`);
        error.statusCode = 400;
        throw error;
      }
      getCountPocket(req.id_user, Pocket)
        .then((amountPocket) => {
          if (saving - (amountPocket + amount) < 0) {
            const error = new Error(`saldo saving not enough`);
            error.statusCode = 400;
            throw error;
          }
          add()
            .Pocket(req.id_user, namePocket, targetAmount, amount, Pocket)
            .then((result) =>
              response(res, 201, result, "Succesfully added Pocket")
            )
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const addDebt = (req, res, next) => {
  try {
    const { name, deadline, amount } = req.body;

    add()
      .Debt(req.id_user, name, deadline, amount, Debt)
      .then((result) => response(res, 201, result, "Succesfully added Debt"))
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
};

module.exports = { addTransaction, addCategory, addPocket, addDebt };
