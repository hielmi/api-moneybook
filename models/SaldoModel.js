const { Sequelize } = require('sequelize');
const db = require('../config/Database');
const { DataTypes } = Sequelize;

const Saldo = db.define('tb_saldo', {
    idSaldo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    need: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    want: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    invest: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    saving: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
}, {
    createdAt: false,
    updatedAt: false,
    timestamps: true,
    freezeTableName: true,
});

module.exports = Saldo;