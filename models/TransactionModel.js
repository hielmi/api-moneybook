const { Sequelize, Model } = require('sequelize');
const db = require('../config/Database');
const { DataTypes } = Sequelize;
const Saldo = require('./SaldoModel')

const Transaction = db.define('tb_transaction', {
    idTransaction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: ['income', 'expense']
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
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
        values: ['need', 'want', 'saving', 'invest', '50/30/20', '70/10/10/10'],
        allowNull: false,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});


module.exports = Transaction; 