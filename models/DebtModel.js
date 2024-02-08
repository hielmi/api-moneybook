const { Sequelize } = require("sequelize");
const db = require("../config/db");
const { DataTypes } = Sequelize;

const Debt = db.define(
  "tb_debt",
  {
    idDebt: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Debt;
