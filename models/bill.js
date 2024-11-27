"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserMysql, BillItem, Address }) {
      // define association here
      Bill.belongsTo(UserMysql, {
        foreignKey: "id_user",
        as: "userBill",
      });

      Bill.belongsTo(Address, {
        foreignKey: "id_address",
        as: "addressBill",
      });

      Bill.hasMany(BillItem, {
        foreignKey: "id_Bill", // Sử dụng chính xác tên của khóa ngoại trong BillItem
        as: "Billitems", // Sửa thành "Billitems" để phản ánh mối quan hệ nhiều-đến-một
      });
    }
  }
  Bill.init(
    {
      id_address: DataTypes.NUMBER,
      id_user: DataTypes.NUMBER,
      total: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Bill",
    }
  );
  return Bill;
};
