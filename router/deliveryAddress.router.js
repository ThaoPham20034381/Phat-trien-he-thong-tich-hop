const express = require("express");
const {
  createDeliveryAddressController,
  getAllDeliveryAddressController,
  updateDeliveryAddressController,
  deleteDeliveryAddressController,
} = require("../controller/deliveryAddress.controller");

const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const deliveryAddressRouter = express.Router();

deliveryAddressRouter.post(
  "/",
  authenticationLogin,
  createDeliveryAddressController
);
deliveryAddressRouter.get(
  "/",
  authenticationLogin,
  getAllDeliveryAddressController
);

deliveryAddressRouter.patch(
  "/",
  authenticationLogin,
  updateDeliveryAddressController
);
deliveryAddressRouter.delete(
  "/:id",
  authenticationLogin,
  deleteDeliveryAddressController
);
module.exports = {
  deliveryAddressRouter,
};
