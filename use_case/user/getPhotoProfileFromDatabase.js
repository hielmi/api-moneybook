
const getPhotoProfileFromDatabase = (idUser, UserModel) => {
    return UserModel.findOne({
        attributes: ['photoProfile'],
        where: {
            idUser,
        }
    })
}
module.exports = getPhotoProfileFromDatabase