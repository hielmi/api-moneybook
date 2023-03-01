const getCountPocket = require('../user/getCountPocket');

const add = () => {
    const Transaction = (idUser, type, amount, note, date, id_category, TransactionModel, SaldoModel, CategoriesModel) => {
        return CategoriesModel.findOne({
            where: {
                idCategory: id_category,
                idUser
            }
        }).then((result) => {
            try {
                const { budgeting } = result
                if (type === 'income') {
                    if (budgeting === '50/30/20') {
                        SaldoModel.increment({
                            need: amount * 0.5,
                            want: amount * 0.3,
                            saving: amount * 0.2
                        }, {
                            where: {
                                idUser
                            }
                        })
                    } else if (budgeting === '70/10/10/10') {
                        SaldoModel.increment({
                            need: amount * 0.7,
                            want: amount * 0.1,
                            saving: amount * 0.1,
                            invest: amount * 0.1
                        }, {
                            where: {
                                idUser
                            }
                        })
                    } else {
                        throw 'Errow while added income'
                    }
                } else if (type === 'expense') {
                    if (budgeting === 'need') {
                        SaldoModel.decrement({ need: amount, }, { where: { idUser } })
                    } else if (budgeting === 'want') {
                        SaldoModel.decrement({ want: amount, }, { where: { idUser } })
                    } else if (budgeting === 'invest') {
                        SaldoModel.decrement({ invest: amount, }, { where: { idUser } })
                    } else if (budgeting === 'saving') {
                        SaldoModel.decrement({ saving: amount, }, { where: { idUser } })
                    } else {
                        throw 'Errow while added income'
                    }
                } else {
                    throw 'Errow while added income'
                }
                TransactionModel.create({
                    idUser,
                    type,
                    amount,
                    note,
                    date,
                    idCategory: id_category
                })
            } catch (err) {
                const error = new Error(`Error while added transaction`);
                error.statusCode = 400;
                throw error;
            }
        })

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

        if (isNaN(amount) || isNaN(targetAmount)) {
            const error = new Error(`amount and target field must be number`);
            error.statusCode = 400;
            throw error;
        }

        if (amount > targetAmount) {
            const error = new Error(`amount cannot be larger than target`);
            error.statusCode = 400;
            throw error;
        }

        return PocketModel.create({
            namePocket,
            targetAmount,
            amount,
            idUser,
        })

    };

    return {
        Transaction,
        Category,
        Pocket,
    };
};

module.exports = add;
