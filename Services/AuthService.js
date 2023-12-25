const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authService = () => {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  const verify = (token) => jwt.verify(token, config.jwtSecret);

  const generateAccessToken = (payload) =>
    jwt.sign(payload, "MONEYBOOK_APP", {
      expiresIn: "1d",
    });

  const generateRefreshToken = (payload) =>
    jwt.sign(payload, "MONEYBOOK_APP", {
      expiresIn: "7d",
    });

  return {
    encryptPassword,
    compare,
    verify,
    generateAccessToken,
    generateRefreshToken,
  };
};

module.exports = authService;
