const findById = () => {
  const findCategoryById = (idUser, idCategory, CategoryModel) => {
    return CategoryModel.findOne({
      where: {
        idUser,
        idCategory,
      },
    });
  };

  const findPocketById = (idUser, idPocket, PocketModel) => {
    return PocketModel.findOne({
      where: {
        idUser,
        idPocket,
      },
    });
  };

  const findTransactionById = (idUser, IdTransaction, TransactionModel) => {
    return TransactionModel.findOne({
      where: {
        idUser,
        IdTransaction,
      },
    });
  };

  const findDebtById = (idUser, idDebt, DebtModel) => {
    return DebtModel.findOne({
      where: {
        idUser,
        idDebt,
      },
    });
  };

  return {
    findCategoryById,
    findPocketById,
    findTransactionById,
    findDebtById,
  };
};

module.exports = findById;
