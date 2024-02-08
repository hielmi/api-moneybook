require("dotenv").config();
const { Sequelize } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";

const dbConfig = new Sequelize(
  isProduction ? process.env.DB_NAME : "dbmoneybook",
  isProduction ? process.env.DB_USERNAME : "root",
  isProduction ? process.env.DB_PASSWORD : "",
  {
    host: isProduction ? process.env.DB_HOST : "localhost",
    dialect: "mysql",
    timezone: "+07:00",
    logging: isProduction ? false : console.log,
  }
);

module.exports = dbConfig;
