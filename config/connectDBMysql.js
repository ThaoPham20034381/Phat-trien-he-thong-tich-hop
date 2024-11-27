const Sequelize = require("sequelize");
const { float } = require("webidl-conversions");

const sequelize = new Sequelize("StoreDB", "root", "secret", {
  host: "127.0.0.1",
  port: "3308",
  dialect: "mysql",
  logging: false,
});
try {
  sequelize.authenticate();
  console.log("Connection DB MYSQL successfull .");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
module.exports = {
  sequelize,
};
