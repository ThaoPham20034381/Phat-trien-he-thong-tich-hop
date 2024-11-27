const {
  createBillService,
  findBillDetailService,
} = require("../services/mysql/bill.services");
const { getDetailProductBySlug } = require("../services/product.services");

const {
  createBillItembyIdBill,
} = require("../services/mysql/billItem.services");

const createBillController = async (req, res) => {
  try {
    const id_user = req.infoUser.id;

    let total = 0;

    const { id_product, quanlity, color, id_address } = req.body;

    //console.log(color);
    //console.log(id_product, quanlity, color, id_address);

    let arrPrice = [];

    // tinh tong ToTal để tạo db Bill
    for (let i = 0; i < id_product.length; i++) {
      const findProduct = await getDetailProductBySlug(id_product[i]);
      console.log(id_product[i]);

      //console.log("findProduct:     ", findProduct);

      const isPrice = findProduct.colors.filter(
        (item) => item.color === color[i]
      );
      console.log("createBillController ~ isPrice:", isPrice);
      const price = isPrice[0].price;

      let priceProduct = Number(price * quanlity[i]);

      // console.log(`${i}    : `, quanlity[i]);
      arrPrice.push(price);
      total += priceProduct;
    }
    const createBill = await createBillService({ id_user, id_address, total });

    console.log(createBill);

    const id_Bill = createBill.dataValues.id;

    // tao từng Bill Item
    for (let i = 0; i < id_product.length; i++) {
      const idProductItem = id_product[i];
      const quanlityItem = quanlity[i];
      const price_per_unit = arrPrice[i];
      const newColor = color[i];

      //console.log(id_Bill, idProductItem, quanlityItem, price_per_unit);

      const data = {
        id_Bill,
        slug_Product: idProductItem,
        quanlity: quanlityItem,
        price_per_unit,
        color: newColor,
      };

      const createBillItem = await createBillItembyIdBill(data);
      createBillItem;
    }

    res.status(200).json({
      status: true,
      data: arrPrice,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

const getBillAllController = async (req, res) => {
  try {
    const id_user = req.infoUser.id;

    const { idBill } = req.body;

    const findBillDetail = await findBillDetailService(idBill);

    console.log(findBillDetail);

    res.status(200).json({
      status: true,
      data: findBillDetail,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      data: error.message,
    });
  }
};

module.exports = {
  createBillController,
  getBillAllController,
};
