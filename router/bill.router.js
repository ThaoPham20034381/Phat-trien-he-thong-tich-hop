const billRouter = require("express").Router();

const {
  createBillController,
  getBillAllController,
} = require("../controller/bill.controller");
const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

billRouter.post("/", authenticationLogin, createBillController);

billRouter.get("/detail", authenticationLogin, getBillAllController);

module.exports = {
  billRouter,
};
