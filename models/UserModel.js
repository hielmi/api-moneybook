const { Sequelize } = require('sequelize');
const db = require('../config/Database');
const { DataTypes } = Sequelize;

const Users = db.define('tb_users', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photoProfile: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true,
    freezeTableName: true,
});


module.exports = Users;