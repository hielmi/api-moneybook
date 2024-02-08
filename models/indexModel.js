const configDB = require("../config/db");
const Sequelize = require("sequelize");

// Model Table
const Users = require("./UserModel");
const Category = require("./CategoryModel");
const Transaction = require("./TransactionModel");
const Pocket = require("./PocketModel");
const Saldo = require("./SaldoModel");
const Debt = require("./DebtModel");

const db = {};

db.Sequelize = Sequelize;
db.dbConfig = configDB;

db.Users = Users;
db.Saldo = Saldo;
db.Pocket = Pocket;
db.Debt = Debt;
db.Category = Category;
db.Transaction = Transaction;

// associations
// user
db.Users.hasOne(Saldo, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
db.Users.hasMany(Pocket, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
db.Users.hasMany(Category, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
db.Users.hasMany(Debt, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
db.Users.hasMany(Transaction, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

// saldo
db.Saldo.belongsTo(Users, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

// pocket
db.Pocket.belongsTo(Users, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

//categories
db.Category.belongsTo(Users, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

// debt
db.Debt.belongsTo(Users, {
  foreignKey: {
    name: "idUser",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

module.exports = db;
