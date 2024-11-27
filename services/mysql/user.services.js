const { UserMysql } = require("../../models/index");
const { Op } = require("sequelize");
const createUserService = async (data) => {
  try {
    if (!data) {
      return null;
    }
    const createUser = await UserMysql.create(data);

    return await createUser;
  } catch (error) {
    return error;
  }
};

const findUserAllUserService = async () => {
  try {
    const findAllUser = await UserMysql.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    return findAllUser;
  } catch (error) {
    return error;
  }
};

const findUserByNumberPhoneOrEmailService = async (slug) => {
  try {
    const findUserByEmail = await UserMysql.findOne({
      where: {
        [Op.or]: [{ email: slug }, { numberPhone: slug }],
      },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    return findUserByEmail;
  } catch (error) {
    return error;
  }
};

const updateUserbyNumberPhoneOrEmailService = async (
  slug,
  email,
  numberPhone,
  fullName,
  role
) => {
  try {
    const updateUser = await UserMysql.update(
      { email, numberPhone, fullName, role },
      {
        where: {
          email: slug,
        },
      }
    );
    console.log(updateUser);
    return updateUser;
  } catch (error) {
    return error;
  }
};

const deletedSoftbyNumberPhoneOrEmailService = async (slug) => {
  try {
    if (!slug) {
      return null;
    }
    const deleteSoft = await UserMysql.destroy({
      where: {
        [Op.or]: [{ email: slug }, { numberPhone: slug }],
      },
    });

    return deleteSoft;
  } catch (error) {
    return error;
  }
};

const findUserAllUserSoftDeletedService = async () => {
  try {
    const findAllUserSoftDeleted = await UserMysql.findAll({
      paranoid: false,
      where: {
        deletedAt: {
          [Op.ne]: null,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    if (findAllUserSoftDeleted.length === 0) {
      return null;
    }
    return findAllUserSoftDeleted;
  } catch (error) {
    return error;
  }
};

const findDetailUserSoftDeletedService = async (slug) => {
  try {
    const findDetailUserSoftDeleted = await UserMysql.findAll({
      paranoid: false,
      where: {
        [Op.or]: [{ email: slug }, { numberPhone: slug }],
        deletedAt: {
          [Op.ne]: null,
        },
      },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    if (findDetailUserSoftDeleted.length == 0) {
      return null;
    }
    return findDetailUserSoftDeleted;
  } catch (error) {
    return error;
  }
};

const restoreAllUserSoftDeletedService = async () => {
  try {
    const restoreAllUser = UserMysql.restore();
    return restoreAllUser;
  } catch (error) {
    return error;
  }
};

const restoreUserSoftDeletedService = async (slug) => {
  try {
    const restoreAllUser = await UserMysql.restore({
      where: {
        [Op.or]: [{ email: slug }, { numberPhone: slug }],
        deletedAt: {
          [Op.ne]: null,
        },
      },
    });

    return restoreAllUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createUserService,
  findUserAllUserService,
  findUserByNumberPhoneOrEmailService,

  updateUserbyNumberPhoneOrEmailService,
  deletedSoftbyNumberPhoneOrEmailService,
  findUserAllUserSoftDeletedService,
  findDetailUserSoftDeletedService,
  restoreAllUserSoftDeletedService,

  restoreUserSoftDeletedService,
};
