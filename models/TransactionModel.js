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
}, {
    timestamps: true,
    freezeTableName: true,
});


module.exports = Transaction; 