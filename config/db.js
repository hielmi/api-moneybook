const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const {
  isProduction,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} = require("./envConfig");

dotenv.config();

const dbConfig = new Sequelize(
  isProduction ? DB_NAME : "dbmoneybook",
  isProduction ? DB_USERNAME : "root",
  isProduction ? DB_PASSWORD : "",
  {
    host: isProduction ? DB_HOST : "localhost",
    dialect: "mysql",
    timezone: "+07:00",
    logging: isProduction ? false : console.log,
  }
);

try {
  console.log(
    `Connection to the database with ${
      isProduction ? "production" : "development"
    } mode has been established successfully.`
  );
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = dbConfig;
