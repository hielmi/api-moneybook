const add = () => {
  const Transaction = (
    idUser,
    type,
    amount,
    note,
    date,
    id_category,
    TransactionModel,
    SaldoModel,
    CategoriesModel
  ) => {
    return CategoriesModel.findOne({
      where: {
        idCategory: id_category,
        idUser,
      },
    })
      .then((result) => {
        const { budgeting, iconCategory, nameCategory } = result;
        if (type === "income") {
          const { need, want, saving, invest } =
            budgeting === "70/10/10/10"
              ? { need: 0.7, want: 0.1, saving: 0.1, invest: 0.1 }
              : { need: 0.5, want: 0.3, saving: 0.2, invest: 0 };

          SaldoModel.increment(
            {
              need: amount * need,
              want: amount * want,
              saving: amount * saving,
              invest: amount * invest,
            },
            { where: { idUser } }
          );
        } else if (type === "expense") {
          const categoryMap = {
            need: "need",
            want: "want",
            invest: "invest",
            saving: "saving",
          };

          const category = categoryMap[budgeting];
          if (category) {
            const decrementData = {};
            decrementData[category] = amount;
            SaldoModel.decrement(decrementData, { where: { idUser } });
          } else {
            throw "Error while adding expense";
          }
        } else {
          throw "Error while adding transaction";
        }
        const [year, month, day] = date.split("-").map(Number);
        const dateFormatted = new Date(year, month - 1, day);

        TransactionModel.create({
          idUser,
          type,
          amount,
          note,
          date: dateFormatted,
          iconCategory,
          nameCategory,
          budgeting,
        });
      })
      .catch((err) => {
        const error = new Error("Error while adding transaction");
        error.statusCode = 400;
        error.customMessage = "Error while adding transaction";
        throw error;
      });
  };

  const Category = (
    idUser,
    iconCategory,
    nameCategory,
    budgeting,
    CategoryModel
  ) => {
    return CategoryModel.create({
      iconCategory,
      nameCategory,
      budgeting,
      idUser,
    });
  };

  const Pocket = (idUser, namePocket, targetAmount, amount, PocketModel) => {
    if (isNaN(amount) || isNaN(targetAmount) || amount > targetAmount) {
      const error = new Error(
        "Amount and target field must be valid numbers, and amount cannot be larger than target"
      );
      error.customMessage =
        "Amount and target field must be valid numbers, and amount cannot be larger than target";
      error.statusCode = 400;
      throw error;
    }

    return PocketModel.create({
      namePocket,
      targetAmount,
      amount,
      idUser,
    });
  };

  const Debt = (idUser, name, deadline, amount, DebtModel) => {
    const [year, month, day] = deadline.split("-").map(Number);
    const dateFormatted = new Date(year, month - 1, day);

    return DebtModel.create({
      name,
      amount,
      deadline: dateFormatted,
      idUser,
    });
  };

  return {
    Transaction,
    Category,
    Pocket,
    Debt,
  };
};

module.exports = add;
