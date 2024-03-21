const  userInfoModel = require('../models/userInformationModel');

// POST /api/hotels
const createOrder = async (req, res) => {
  try {
    const { userName, phoneNo, address, userId } = req.body;

    // Create a new OrderDetails instance
    const newOrderDetail = new  userInfoModel({
      userName,
      phoneNo,
      address,
      userId
    });

    const savedOrderDetail = await newOrderDetail.save();

    res.status(201).json(savedOrderDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const existingOrders = await  userInfoModel.find({ userId });

    if (existingOrders.length > 0) {
      res.status(200).json({ hasOrders: true });
    } else {
      res.status(200).json({ hasOrders: false });
    }
  } catch (error) {
    console.error('Error checking user orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
  module.exports = {
    createOrder,
    checkUserId
  };