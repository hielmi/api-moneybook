const {
  fetchTransactionByIdUser,
} = require("../../controllers/UserController");

const fs = require("fs");

const BackupFeature = (idUser, TransactionModel) => {
  const backupData = (idUser, IdTransaction, TransactionModel) => {
    return TransactionModel.findOne({
      where: {
        idUser,
        IdTransaction,
      },
    }).then((result) => {
      
    });
  };

  const restoreData = (idUser, IdTransaction, TransactionModel) => {
    return TransactionModel.findOne({
      where: {
        idUser,
        IdTransaction,
      },
    });
  };

  return {
    backupData,
    restoreData,
  };
};

module.exports = BackupFeature;
