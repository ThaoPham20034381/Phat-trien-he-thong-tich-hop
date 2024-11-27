const {
  createUserController,
  findAllUserController,
  findUserByEmailorPhoneNumber,

  updateUserbyNumberPhoneOrEmail,
  deleteUserbyNumberPhoneOrEmail,
  softDeleteUserbyNumberPhoneOrEmail,
  findAllUserSoftDeletedController,
  findDetailUserSoftDeletedController,
  restoreAllUserSoftDeletedController,
  restoreUserSoftDeletedController,
} = require("../controller/user.controller");

const {
  authenticationLogin,
} = require("../middlewares/authentication.middlewates");
const {
  authorizationAdmin,
} = require("../middlewares/authorization.middleware");

const userRouter = require("express").Router();

//   localhost:3000/user/create
userRouter.post("/create", createUserController);

// localhost:3000/user/softdeleted
userRouter.get(
  "/soft-deleted",
  authenticationLogin,
  findAllUserSoftDeletedController
);

//  localhost:3000/user/soft-deleted/restore/
userRouter.post("/soft-deleted/restore/", restoreAllUserSoftDeletedController);

//  localhost:3000/user/soft-deleted/restore/:slug
userRouter.post(
  "/soft-deleted/restore/:slug",
  restoreUserSoftDeletedController
);

//   localhost:3000/user/soft-deleted/huyfa352002@gmail.com
userRouter.get(
  "/soft-deleted/:slug",

  findDetailUserSoftDeletedController
);

//   localhost:3000/user/:mail
userRouter.get(
  "/:slug",
  authenticationLogin,
  // authorizationAdmin,
  findUserByEmailorPhoneNumber
);

//   localhost:3000/user/:slug
userRouter.patch("/:slug", updateUserbyNumberPhoneOrEmail);

//   localhost:3000/user/
userRouter.get(
  "/",
  authenticationLogin,
  authorizationAdmin,
  findAllUserController
);

//   localhost:3000/user/:slug
userRouter.delete("/:slug", deleteUserbyNumberPhoneOrEmail);

//   localhost:3000/user/softDelete/:slug
userRouter.delete("/softDelete/:slug", softDeleteUserbyNumberPhoneOrEmail);

module.exports = {
  userRouter,
};
