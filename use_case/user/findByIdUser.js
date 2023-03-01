const findByIdUser = () => {
    const findUser = (idUser, UsersModel) => {
        return UsersModel.findOne({
            attributes: ['username', 'email', 'firstname', 'lastname', 'photoProfile'],
            where: {
                idUser,
            }
        })
    }

    const findSaldo = (idUser, SaldoModel) => {
        return SaldoModel.findOne({
            where: {
                idUser,
            }
        })
    }

    const findCategory = (idUser, CategoryModel) => {
        return CategoryModel.findAll({
            where: {
                idUser
            },
        })
    }

    const findTransaction = (idUser, TransactionModel, CategoriesModel) => {
        return TransactionModel.findAll({
            where: {
                idUser,
            },
            include: [CategoriesModel]
        })
    }

    const findPocket = (idUser, PocketModel) => {
        return PocketModel.findAll({
            where: {
                idUser,
            }
        })
    }

    return {
        findUser,
        findCategory,
        findTransaction,
        findPocket,
        findSaldo
    }
}

module.exports = findByIdUser
