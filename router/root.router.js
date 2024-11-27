const router = require("express").Router();

const { cartRouter } = require("./cart.router");
const { HomePageRouter } = require("./homepage.router");
const { loginRouter } = require("./login.router");
const { productRouter } = require("./product.router");
const { userRouter } = require("./user.router");

const { billRouter } = require("./bill.router");
const { deliveryAddressRouter } = require("./deliveryAddress.router");
router.use("/", HomePageRouter);
router.use("/product", productRouter);
router.use("/user", userRouter);
router.use("/login", loginRouter);
router.use("/cart", cartRouter);

router.use("/bill", billRouter);
router.use("/delivery-address", deliveryAddressRouter);
module.exports = router;
