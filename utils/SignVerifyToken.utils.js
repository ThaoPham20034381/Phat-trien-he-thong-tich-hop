const jwt = require("jsonwebtoken");
const key = process.env.PRIVATE_KEY;
require("dotenv").config();

const EncryptionUtils = async (password) => {
  const encryption = await jwt.sign(password, key);
  return encryption;
};

const DecodeUtils = async (token) => {
  const decode = await jwt.verify(token, key);
  return decode;
};

module.exports = {
  EncryptionUtils,
  DecodeUtils,
};
