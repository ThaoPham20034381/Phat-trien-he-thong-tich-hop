const mongoose = require("mongoose");

const connectDBMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://root:abc@127.0.0.1:27039/Store");
    console.log(`connect DB MongoDB Store successfull`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  connectDBMongoDB,
};
