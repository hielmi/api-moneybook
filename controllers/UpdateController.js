//model
const CategoryModel = require("../models/CategoryModel");
const PocketModel = require("../models/PocketModel");
const UserModel = require("../models/UserModel");
const Saldo = require("../models/SaldoModel");
const Debt = require("../models/DebtModel");

//usecase
const update = require("../use_case/update/update");
const findById = require("../use_case/user/findById");
const getCountPocket = require("../use_case/user/getCountPocket");
const fs = require("fs");
const getPhotoProfileFromDatabase = require("../use_case/user/getPhotoProfileFromDatabase");

// lib
const { response, errResponse } = require("../utils/response");

const updateCategory = (req, res, next) => {
  const idCategory = req.params.id;
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
    const error = new Error(`wrong input budgeting`);
    error.statusCode = 400;
    throw error;
  }

  update()
    .Category(
      req.id_user,
      idCategory,
      iconCategory,
      nameCategory,
      budgeting,
      CategoryModel
    )
    .then((result) => {
      console.log(result);
      if (result == 1) {
        res.json({ status: 200, message: "Successfully updated Category" });
      } else {
        const error = new Error(`Failed to update Category`);
        error.statusCode = 400;
        throw error;
      }
    })
    .catch((err) => next(err));
};

const updatePocket = (req, res, next) => {
  const idPocket = req.params.id;
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
      findById()
        .findPocketById(req.id_user, idPocket, PocketModel)
        .then((pocket) => {
          getCountPocket(req.id_user, PocketModel)
            .then((currentAmount) => {
              if (saving - (currentAmount - pocket.amount + amount) < 0) {
                const error = new Error(`saldo saving not enough`);
                error.statusCode = 400;
                throw error;
              }
              update()
                .Pocket(
                  req.id_user,
                  idPocket,
                  namePocket,
                  targetAmount,
                  amount,
                  PocketModel
                )
                .then((result) => {
                  if (result == 1) {
                    res.json({
                      status: 200,
                      message: "Successfully update Pocket",
                    });
                  } else {
                    const error = new Error(
                      `Failed to update Pocket, maybe idPocket doesn't exist`
                    );
                    error.statusCode = 400;
                    throw error;
                  }
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const photoProfile = req?.file?.filename || null;
  const { firstname, lastname } = req.body;
  return getPhotoProfileFromDatabase(req.id_user, UserModel)
    .then((result) => {
      const oldImage = result.photoProfile;
      if (result !== null) {
        fs.unlink(`./public/images/${oldImage}`, (err) => {
          if (err) {
            return;
          }
        });
      }
      update()
        .User(req.id_user, firstname, lastname, photoProfile, UserModel)
        .then((result) => {
          if (result >= 1) {
            res.json({ status: 200, message: "Successfully update User" });
          } else {
            const error = new Error(`Failed to update User`);
            error.statusCode = 400;
            throw error;
          }
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const updateDebt = (req, res, next) => {
  try {
    const idDebt = req.params.id;
    const { name, deadline, amount } = req.body;
    update()
      .Debt(req.id_user, idDebt, name, amount, deadline, Debt)
      .then((result) => {
        if (result > 0) {
          response(
            res,
            201,
            { idDebt, name, amount, deadline },
            "Succesfully updated Debt"
          );
        } else {
          const error = new Error(`Failed to update Debt`);
          error.statusCode = 400;
          throw error;
        }
      })
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
};
module.exports = { updateCategory, updatePocket, updateUser, updateDebt };
