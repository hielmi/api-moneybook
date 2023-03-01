const getCountPocket = async (idUser, PocketModel) => {
    return PocketModel.sum('amount', {
        where: {
            idUser
        }
    })
        .then((result) => result === null ? 0 : result)
        .catch((err) => console.log(err));
}
module.exports = getCountPocket;