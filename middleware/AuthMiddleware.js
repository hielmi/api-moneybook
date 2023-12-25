const jwt = require("jsonwebtoken");
const Users = require("../models/UserModel");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({
        msg: "No token provided!",
      });
    }

    const decoded = jwt.verify(token, "MONEYBOOK_APP");
    req.id_user = decoded.user.id;

    const user = await Users.findOne({
      where: {
        idUser: req.id_user,
      },
    });

    if (!user) {
      throw new Error("Unauthorized!");
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        msg: "Token expired!",
      });
    }

    return res.status(401).send({
      msg: "Unauthorized!",
    });
  }
};

module.exports = AuthMiddleware;
