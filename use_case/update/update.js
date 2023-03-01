const update = () => {
    const Category = (idUser, idCategory, iconCategory, nameCategory, budgeting, CategoryModel) => {
        return CategoryModel.update({
            iconCategory, nameCategory, budgeting, updateAt: new Date()
        }, {
            where: {
                idUser,
                idCategory
            }
        });
    }

    const Pocket = (idUser, idPocket, namePocket, targetAmount, amount, PocketModel) => {
        return PocketModel.update({
            namePocket, targetAmount, amount, updateAt: new Date()
        }, {
            where: {
                idUser, idPocket
            }
        })
    }

    const User = (idUser, firstname, lastname, photoProfile, UserModel) => {
        return UserModel.update({ firstname, lastname, photoProfile }, {
            where: { idUser }
        })
    }
    return {
        Category,
        Pocket,
        User
    }
}

module.exports = update;