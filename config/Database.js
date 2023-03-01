const dbConfig = require("../config/db.config.js");

const { Sequelize } = require('sequelize');
// const dbConfig = new Sequelize(
//     process.env.NODE_ENV === 'production' ? 'freedb_moneybook_db' : 'dbmoneybook',
//     process.env.NODE_ENV === 'production' ? 'freedb_hielmisulaeman' : 'root',
//     process.env.NODE_ENV === 'production' ? '*SnQH#$aKNP9$P%' : '',
//     {
//         host: process.env.NODE_ENV === 'production' ? 'sql.freedb.tech' : 'localhost',
//         dialect: 'mysql',
//         timezone: '+07:00',
//         logging: process.env.NODE_ENV === 'production' ? false : console.log
//     })

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: 3306,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

module.exports = sequelize;
