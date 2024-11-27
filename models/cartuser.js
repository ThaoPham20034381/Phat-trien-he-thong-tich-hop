// CartUser model
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartUser extends Model {
    static associate({ UserMysql }) {
      CartUser.belongsTo(UserMysql, { foreignKey: "id_user" });
    }
  }
  CartUser.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CartUser",
    }
  );
  return CartUser;
};
