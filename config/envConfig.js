// envConfig.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  isProduction: process.env.NODE_ENV === "production",
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
};
