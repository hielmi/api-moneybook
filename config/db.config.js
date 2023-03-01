// module.exports = {
//     HOST: "mysql.freehostia.com",
//     USER: "hiesul_moneybook",
//     PASSWORD: "A9UT96rji(",
//     DB: "hiesul_moneybook",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };
const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    HOST: process.env.HOSTDB,
    USER: process.env.USERDB,
    PASSWORD: process.env.PASSDB,
    DB: process.env.DBNAME,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};