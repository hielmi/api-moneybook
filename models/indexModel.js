const configDB = require("../config/Database");
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
db.Users.hasOne(Saldo, { foreignKey: "idUser" });
db.Users.hasMany(Pocket, { foreignKey: "idUser" });
db.Users.hasMany(Debt, { foreignKey: "idUser" });
db.Users.hasMany(Category, { foreignKey: "idUser" });
db.Users.hasMany(Transaction, { foreignKey: "idUser" });

// saldo
db.Saldo.belongsTo(Users, { foreignKey: "idUser" });

// pocket
db.Pocket.belongsTo(Users, { foreignKey: "idUser" });

// Debt
db.Debt.belongsTo(Users, { foreignKey: "idUser" });

//categories
db.Category.belongsTo(Users, { foreignKey: "idUser" });

// Transaction
db.Transaction.belongsTo(Users, { foreignKey: "idUser" });

module.exports = db;
