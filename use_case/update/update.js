const update = () => {
  const Category = (
    idUser,
    idCategory,
    iconCategory,
    nameCategory,
    budgeting,
    CategoryModel
  ) => {
    return CategoryModel.update(
      {
        iconCategory,
        nameCategory,
        budgeting,
        updateAt: new Date(),
      },
      {
        where: {
          idUser,
          idCategory,
        },
      }
    );
  };

  const Pocket = (
    idUser,
    idPocket,
    namePocket,
    targetAmount,
    amount,
    PocketModel
  ) => {
    return PocketModel.update(
      {
        namePocket,
        targetAmount,
        amount,
        updateAt: new Date(),
      },
      {
        where: {
          idUser,
          idPocket,
        },
      }
    );
  };

  const User = (idUser, firstname, lastname, photoProfile, UserModel) => {
    return UserModel.update(
      { firstname, lastname, photoProfile },
      {
        where: { idUser },
      }
    );
  };

  const Debt = (idUser, idDebt, name, amount, deadline, DebtModel) => {
    const date = new Date(...deadline.split("-").map(Number));
    return DebtModel.update(
      { name, amount, deadline: date, updateAt: new Date() },
      {
        where: { idUser, idDebt },
      }
    );
  };

  return {
    Category,
    Pocket,
    User,
    Debt,
  };
};

module.exports = update;
