const { BillItem } = require("../../models/index");

const createBillItembyIdBill = async (data) => {
  // console.log(id_Bill, idProductItem, quanlityItem, price_per_unit);

  const createBillItem = await BillItem.create(data);
  return createBillItem;
};

module.exports = {
  createBillItembyIdBill,
};
