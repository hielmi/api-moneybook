const addUser = (
    username,
    email,
    password,
    confPassword,
    firstname,
    lastname, UsersModel, authService) => {

    if (!username || !password || !email || !confPassword || !firstname || !lastname) {
        throw new Error('please make sure all fields filled');
    }

    if (password !== confPassword) throw new Error("password and password confirmation doesn'match")

    const newUser = {
        username,
        email,
        password: authService.encryptPassword(password),
        firstname,
        lastname
    }

    return UsersModel.findAll({
        where: {
            username: username,
        }
    })
        .then((userWithUsername) => {
            if (userWithUsername.length) {
                throw new Error(`User with username: ${userWithUsername[0].username} already exists`);
            }
            return UsersModel.findAll({
                where: {
                    email: email,
                }
            })
        })
        .then((userWithEmail) => {
            if (userWithEmail.length) {
                throw new Error(`User with email: ${userWithEmail[0].email} already exists`);
            }

            return UsersModel.create(newUser);
        });
}

module.exports = addUser