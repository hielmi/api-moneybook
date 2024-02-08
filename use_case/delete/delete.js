const deleteRecord = () => {
  const User = (
    idUser,
    UserModel,
    SaldoModel,
    CategoryModel,
    PocketModel,
    TransactionModel
  ) => {
    return Promise.all([
      SaldoModel.destroy({ where: { idUser } }),
      CategoryModel.destroy({ where: { idUser } }),
      PocketModel.destroy({ where: { idUser } }),
      TransactionModel.destroy({ where: { idUser } }),
      UserModel.destroy({ where: { idUser } }),
    ]);
  };

  const Category = (idUser, idCategory, CategoryModel) => {
    return CategoryModel.destroy({ where: { idUser, idCategory } });
  };

  const Pocket = (idUser, idPocket, PocketModel) => {
    return PocketModel.destroy({ where: { idUser, idPocket } });
  };

  const Debt = (idUser, idDebt, DebtModel) => {
    return DebtModel.destroy({ where: { idUser, idDebt } })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    User,
    Category,
    Pocket,
    Debt,
  };
};

module.exports = deleteRecord;
