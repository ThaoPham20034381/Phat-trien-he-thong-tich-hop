const {
  findUserByNumberPhoneOrEmailService,
} = require("../services/mysql/user.services");
const { DecodeUtils } = require("../utils/SignVerifyToken.utils");

require("dotenv").config();

const authorizationAdmin = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log(token);
    if (!token) {
      return res.status(400).json({
        status: false,
        data: "login request !!",
      });
    }

    const Decode = await DecodeUtils(token);

    const { email, numberPhone } = Decode;

    const findUser = await findUserByNumberPhoneOrEmailService(email);

    if (findUser === null) {
      return res.status(404).json({
        status: false,
        data: "Not Found User Middleware !!",
      });
    }
    const { role } = findUser;
    if (role === "admin") {
      next();
    } else {
      return res.status(404).json({
        status: false,
        data: "User Not Permission !!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: false,
      data: error.message,
    });
  }
};

module.exports = {
  authorizationAdmin,
};
