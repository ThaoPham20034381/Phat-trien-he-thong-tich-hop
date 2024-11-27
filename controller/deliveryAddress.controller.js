const {
  createDeliveryShippingService,
  findAllDeliveryAddressService,
  findDetailDeliveryAddressService,
  updateDetailDeliveryAddressService,
  deleteDeliveryAddressService,
} = require("../services/mysql/deliveryAddress.services");

const createDeliveryAddressController = async (req, res) => {
  try {
    const id = req.infoUser.id;

    const { token, ...data } = req.body;
    data.id_User = id;

    const createDeliveryShipping = await createDeliveryShippingService(data);

    if (createDeliveryShipping.errors) {
      return res.status(404).json({
        status: false,
        data: createDeliveryShipping.errors[0].message,
      });
    }
    res.status(200).json({
      status: true,
      data: createDeliveryShipping,
    });
  } catch (error) {
    res.status(404).json({
      status: true,
      data: error.message,
    });
  }
};

const getAllDeliveryAddressController = async (req, res) => {
  try {
    const id_User = req.infoUser.id;

    const findAllDeliveryAddress = await findAllDeliveryAddressService({
      id_User,
    });

    res.status(200).json({
      status: true,
      data: findAllDeliveryAddress,
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      data: error.message,
    });
  }
};

const updateDeliveryAddressController = async (req, res) => {
  try {
    const id_User = req.infoUser.id;

    const { token, id, ...data } = req.body;
    const findDetailDeliveryAddress = await findDetailDeliveryAddressService({
      id,
    });

    if (!findDetailDeliveryAddress) {
      return res.status(404).json({
        status: true,
        data: "Not Found Address !!!",
      });
    }
    const updateDetailDeliveryAddress =
      await updateDetailDeliveryAddressService({
        id,
        data,
      });
    const findCurrentDetailDeliveryAddress =
      await findDetailDeliveryAddressService({
        id,
      });
    res.status(200).json({
      status: true,
      update: updateDetailDeliveryAddress,
      data: findCurrentDetailDeliveryAddress,
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      data: error.message,
    });
  }
};

const deleteDeliveryAddressController = async (req, res) => {
  try {
    const id_User = req.infoUser.id;
    const id = req.params.id;
    const findDetailDeliveryAddress = await findDetailDeliveryAddressService({
      id,
    });
    if (!findDetailDeliveryAddress) {
      return res.status(404).json({
        status: true,
        data: "Not Found Address !!!",
      });
    }
    const deleteDeliveryAddress = await deleteDeliveryAddressService({
      id,
    });

    res.status(200).json({
      status: true,
      deleted: deleteDeliveryAddress,
      data: findDetailDeliveryAddress,
    });
  } catch (error) {
    res.status(200).json({
      status: true,
      data: error.message,
    });
  }
};

module.exports = {
  createDeliveryAddressController,
  getAllDeliveryAddressController,
  updateDeliveryAddressController,
  deleteDeliveryAddressController,
};
