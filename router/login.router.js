const { loginUserCotroller } = require("../controller/login.controller");
const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const loginRouter = require("express").Router();

loginRouter.post("/", loginUserCotroller);
// loginRouter.get("/", loginUserCotroller);

module.exports = {
  loginRouter,
};
