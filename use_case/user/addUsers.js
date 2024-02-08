const db = require("../../models/indexModel");
const addUser = async (
  username,
  email,
  password,
  confPassword,
  firstname,
  lastname,
  UsersModel,
  authService
) => {
  if (
    !username ||
    !password ||
    !email ||
    !confPassword ||
    !firstname ||
    !lastname
  ) {
    throw new Error("Please make sure all fields are filled");
  }

  if (password !== confPassword) {
    throw new Error("Password and password confirmation don't match");
  }

  try {
    // Check if username or email already exists
    const existingUser = await UsersModel.findOne({
      where: {
        [db.Sequelize.Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error(`Username '${username}' is already taken`);
      } else {
        throw new Error(`Email '${email}' is already registered`);
      }
    }

    // Create and return the new user
    const createdUser = await UsersModel.create({
      username,
      email,
      password: authService.encryptPassword(password),
      firstname,
      lastname,
    });

    return createdUser;
  } catch (error) {
    console.log("error" + error);
    throw error;
  }
};

module.exports = addUser;
