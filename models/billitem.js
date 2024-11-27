"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BillItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Bill }) {
      // define association here
      BillItem.belongsTo(Bill, {
        foreignKey: "id_Bill",
        as: "Bill", // Đổi tên alias thành "Bill"
      });
    }
  }
  BillItem.init(
    {
      id_Bill: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      slug_Product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quanlity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price_per_unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BillItem",
    }
  );
  return BillItem;
};
