const {
  findUserByNumberPhoneOrEmailService,
} = require("../services/mysql/user.services");
const {
  EncryptionUtils,
  DecodeUtils,
} = require("../utils/SignVerifyToken.utils");

require("dotenv").config();

const loginUserCotroller = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log({ username, password });

    if (!username || !password) {
      return res.status(404).json({
        status: false,
        data: "Missing username or password  !!!",
      });
    }

    const findUser = await findUserByNumberPhoneOrEmailService(username);

    if (findUser === null) {
      return res.status(404).json({
        status: false,
        data: "username or password wrong !!!",
      });
    }
    const passwordUser = findUser.passWord;

    const { fullName, email, numberPhone, role } = findUser;

    // verify token
    const passwordDecode = await DecodeUtils(passwordUser);

    if (password === passwordDecode) {
      //  create token send to user
      const encryptionData = await EncryptionUtils({
        fullName,
        email,
        numberPhone,
        role,
      });
      // console.log(encryptionData);

      return res.status(200).json({
        status: true,
        token: encryptionData,
        fullName: fullName,
      });
    } else {
      return res.status(404).json({
        status: false,
        data: "wrong password !!!",
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
  loginUserCotroller,
};
