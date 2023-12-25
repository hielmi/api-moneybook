const { Op } = require("sequelize");

const login = async (username, password, UsersModel, authService) => {
  try {
    if (!username || !password) {
      throw new Error("Email and password fields cannot be empty");
    }

    const user = await UsersModel.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: username }],
      },
    });

    if (!user) {
      throw new Error("Username or email doesn't exist");
    }

    const isMatch = await authService.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const payload = {
      user: {
        id: user.idUser,
      },
    };

    return {
      accessToken: authService.generateAccessToken(payload),
      refreshToken: authService.generateRefreshToken(payload),
    };
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

module.exports = login;
