"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserMysql, Bill }) {
      // define association here

      // Address.hasMany(Bill, {
      //   foreignKey: "id",
      //   as: "IdOfAddress",
      // });

      Address.belongsTo(UserMysql, {
        foreignKey: "id_User",
        as: "idOfUserMysqlModel",
      });
    }
  }
  Address.init(
    {
      id_User: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberPhone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
