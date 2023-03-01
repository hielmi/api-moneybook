const findById = () => {
    const findCategoryById = (idUser, idCategory, CategoryModel) => {
        return CategoryModel.findOne({
            where: {
                idUser,
                idCategory
            }
        });
    }

    const findPocketById = (idUser, idPocket, PocketModel) => {
        return PocketModel.findOne({
            where: {
                idUser,
                idPocket
            }
        });
    }

    const findTransactionById = (idUser, IdTransaction, TransactionModel) => {
        return TransactionModel.findOne({
            where: {
                idUser,
                IdTransaction
            }
        })
    }
    return {
        findCategoryById,
        findPocketById,
        findTransactionById
    }
}

module.exports = findById;