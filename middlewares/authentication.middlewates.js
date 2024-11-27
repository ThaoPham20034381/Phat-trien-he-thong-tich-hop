const {
  findUserByNumberPhoneOrEmailService,
} = require("../services/mysql/user.services");
const { DecodeUtils } = require("../utils/SignVerifyToken.utils");

require("dotenv").config();

const authenticationLogin = async (req, res, next) => {
  try {
    const token = req.body.token || req.header("Authorization");
    console.log("authenticationLogin ~ token:", token);

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
        data: "Login again !!!",
      });
    }

    // console.log(findUser);

    req.infoUser = findUser;

    next();

    //   console.log(token);
  } catch (error) {
    return res.status(404).json({
      status: false,
      data: error.message,
    });
  }
};

module.exports = {
  authenticationLogin,
};
