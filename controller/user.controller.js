const {
  createUserService,
  findUserAllUserService,
  findUserByNumberPhoneOrEmailService,
  updateUserbyNumberPhoneOrEmailService,
  deletedSoftbyNumberPhoneOrEmailService,
  findUserAllUserSoftDeletedService,
  findDetailUserSoftDeletedService,
  restoreAllUserSoftDeletedService,
  restoreUserSoftDeletedService,
} = require("../services/mysql/user.services");

const {
  EncryptionUtils,
  DecodeUtils,
} = require("../utils/SignVerifyToken.utils");

const createUserController = async (req, res) => {
  try {
    const data = req.body;
    const { passWord } = data;

    if (!data) {
      res.status(400).json({
        status: false,
        data: "missing data",
      });
    }

    if (!data.role) {
      req.body.role = "customer";
    }

    const encryptionPassword = await EncryptionUtils(passWord);
    req.body.passWord = encryptionPassword;

    // verify token
    // const passwordDecode = await passwordDecodeUtils(encryptionPassword);

    const createUser = await createUserService(data);
    console.log("====================================");
    console.log(createUser);
    console.log("====================================");

    if (createUser.errors) {
      return res.status(404).json({
        status: false,
        data: createUser,
      });
    }
    res.status(200).json({
      status: true,
      data1: createUser,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: false,
      data: error.massages,
    });
  }
};

const findAllUserController = async (req, res) => {
  try {
    const findUser = await findUserAllUserService();
    res.status(200).json({
      status: true,
      data: findUser,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

const findUserByEmailorPhoneNumber = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      res.status(400).json({
        status: false,
        data: "Missing Email",
      });
    }

    const findUserByEmail = await findUserByNumberPhoneOrEmailService(slug);
    if (findUserByEmail == null) {
      return res.status(400).json({
        status: false,
        data: "Not Found User !!!",
      });
    }
    res.status(200).json({
      status: true,
      data: findUserByEmail,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

const updateUserbyNumberPhoneOrEmail = async (req, res) => {
  const { slug } = req.params;
  const { email, numberPhone, fullName, role } = req.body;

  if (!slug) {
    return res.status(404).json({
      status: false,
      data: "missing !!",
    });
  }

  const updateUser = await updateUserbyNumberPhoneOrEmailService(
    slug,
    email,
    numberPhone,
    fullName,
    role
  );

  res.status(200).json({
    status: true,
    data: updateUser,
  });
};

const deleteUserbyNumberPhoneOrEmail = async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(200).json({
      status: true,
      delete: "delete",
      data: slug,
    });
  }
  const findUser = findUserByEmailService(slug);
  res.status(200).json({
    status: true,
    delete: "delete",
    data: slug,
  });
};

const softDeleteUserbyNumberPhoneOrEmail = async (req, res) => {
  try {
    const { slug } = req.params;

    const findUser = await findUserByNumberPhoneOrEmailService(slug);

    if (findUser === null) {
      return res.status(200).json({
        status: false,
        delete: 0,
        data: "Not Found User !!",
      });
    }
    const deleteSoft = await deletedSoftbyNumberPhoneOrEmailService(slug);

    res.status(200).json({
      status: true,
      delete: deleteSoft,
      data: findUser,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(200).json({
      status: true,
      data: error.message,
    });
  }
};

const findAllUserSoftDeletedController = async (req, res) => {
  try {
    const findUser = await findUserAllUserSoftDeletedService();
    if (findUser === null) {
      return res.status(200).json({
        status: true,
        data: "There are no users !!!",
      });
    }
    res.status(200).json({
      status: true,
      data: findUser,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

const findDetailUserSoftDeletedController = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(404).json({
        status: false,
        data: "missing email or phone number",
      });
    }
    const getDetailUserSoftDeleted = await findDetailUserSoftDeletedService(
      slug
    );
    if (getDetailUserSoftDeleted == null) {
      return res.status(200).json({
        status: true,
        data: "Not Found User !!",
      });
    }
    res.status(200).json({
      status: true,
      data: getDetailUserSoftDeleted,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

const restoreAllUserSoftDeletedController = async (req, res) => {
  try {
    const restoreAllUser = await restoreAllUserSoftDeletedService();
    res.status(200).json({
      status: true,
      data: restoreAllUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

const restoreUserSoftDeletedController = async (req, res) => {
  try {
    const { slug } = req.params;

    const getDetailUserSoftDeleted = await findDetailUserSoftDeletedService(
      slug
    );
    if (getDetailUserSoftDeleted == null) {
      return res.status(200).json({
        status: true,
        data: "Not Found User !!",
      });
    }

    const restoreUserSoftDeleted = await restoreUserSoftDeletedService(slug);

    res.status(200).json({
      status: true,
      delete: restoreUserSoftDeleted,
      user: getDetailUserSoftDeleted,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error,
    });
  }
};

module.exports = {
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
};
