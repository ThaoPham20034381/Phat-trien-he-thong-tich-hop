const { Op } = require("sequelize");
const { CartUser } = require("../../models/index");

const findCartbyIdUserService = async (id) => {
  try {
    // console.log("service : id =    ", id);
    const findCart = await CartUser.findAll({
      where: {
        id_user: id,
      },
      attributes: {
        exclude: ["id", "id_user", "updatedAt"],
      },
      order: [
        ["createdAt", "DESC"], // Sắp xếp theo thời gian khởi tạo tăng dần
        // Hoặc ['createdAt', 'DESC'] nếu bạn muốn sắp xếp giảm dần
        //["createdAt", "ASC"], // Sắp xếp theo thời gian khởi tạo tăng dần
      ],
    });

    return findCart;
  } catch (error) {
    throw new Error(
      "Đã xảy ra lỗi khi tìm kiếm giỏ hàng của người dùng theo ID: " +
        error.message
    );
  }
};

const addProductToCartService = async (newProduct) => {
  try {
    const addProduct = await CartUser.create(newProduct);
    //console.log("addProductToCartService ~ addProduct:", addProduct);
    return addProduct;
  } catch (error) {
    throw new Error("lỗi rồi " + error.message);
  }
};

const findProductDetailCardService = async (id_user, id_product, color) => {
  try {
    if (!id_user) return "Service Missing id";
    const findProductDetailCard = await CartUser.findAll({
      attributes: [
        "id",
        "id_user",
        "id_product",
        "quantity",
        "color",
        "createdAt",
        "updatedAt",
      ], // Chỉ chọn các cột được định nghĩa trong model
      where: {
        [Op.and]: [
          { id_user: id_user },
          { id_product: id_product },
          { color: color },
        ],
      },
    });

    if (!findProductDetailCard.length) {
      return null;
    }
    return findProductDetailCard;
  } catch (error) {
    return error;
  }
};

const increaseQuantityCartServer = async (
  id_user,
  id_product,
  color,
  newQuantity,
  defaultQuantity
) => {
  try {
    if (!id_product || !newQuantity || !color)
      return "Service Missing id_product";

    const increaseProduct = await CartUser.update(
      { quantity: newQuantity || defaultQuantity },
      {
        where: {
          [Op.and]: [
            { id_user: id_user },
            { id_product: id_product },
            { color: color },
          ],
        },
      }
    );

    return increaseProduct;
  } catch (error) {
    return error;
  }
};

const removeProductInCartService = async ({ id_user, id_product }) => {
  try {
    if (!id_user && !id_product) return "missing id_user, id_product";

    const removeProductInCart = await CartUser.destroy({
      where: {
        [Op.and]: [{ id_user }, { id_product }],
      },
    });
    return removeProductInCart;
  } catch (error) {
    throw new Error("Lôi tại service Remove Product In Cart : " + error);
  }
};

module.exports = {
  findCartbyIdUserService,
  addProductToCartService,
  findProductDetailCardService,
  increaseQuantityCartServer,
  removeProductInCartService,
};
