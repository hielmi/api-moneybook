const { Sequelize } = require("sequelize");
const db = require("../config/db");
const { DataTypes } = Sequelize;

const Pocket = db.define(
  "tb_pocket",
  {
    idPocket: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    namePocket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Pocket;
