const { Sequelize } = require("sequelize");
const db = require("../config/db");
const { DataTypes } = Sequelize;

const Category = db.define(
  "tb_category",
  {
    idCategory: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    iconCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budgeting: {
      type: DataTypes.ENUM,
      values: ["need", "want", "saving", "invest", "50/30/20", "70/10/10/10"],
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Category;
