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
    const error = new Error("Please make sure all fields are filled");
    error.statusCode = 400;
    error.customMessage = "Please make sure all fields are filled";
    throw error;
  }

  if (password !== confPassword) {
    const error = new Error("Password and password confirmation don't match");
    error.statusCode = 400;
    error.customMessage = "Password and password confirmation don't match";
    throw error;
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
        const error = new Error(`Username '${username}' is already taken`);
        error.statusCode = 400;
        error.customMessage = `Username '${username}' is already taken`;
        throw error;
      } else {
        const error = new Error(`Email '${email}' is already registered`);
        error.statusCode = 400;
        error.customMessage = `Email '${email}' is already registered`;
        throw error;
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
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 400;
    error.customMessage = err;
    throw error;
  }
};

module.exports = addUser;
