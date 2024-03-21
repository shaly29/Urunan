// const orderModel = require('../models/orderModel');
// const productModel = require('../models/productModel');
// // const asyncHandler = require('express-async-handler')


// //Create Order - /api/v1/order /new
// exports.createOrder = async (req, res, next) => {
//     const cartItems = req.body;
//     const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
//     const status = 'pending';
//     const order = await orderModel.create({cartItems, amount, status})

//     // Updating product stock
//     cartItems.forEach(async (item)=> {
//         const product = await productModel.findById(item.product._id);
//         product.stock = product.stock - item.qty;
//         await product.save();
//     })


//     res.json(
//         {
//             success:true,
//             order
//         }
//     )
// }



// //Create New Order - api/v1/order/new
// exports.newOrder = asyncHandler ( async (req, res, next) => {
//     const {
//         orderItems,
//         shippingInfo,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//         paymentInfo
//     } = req.body;

//     const order = await orderModel.create({
//         orderItems,
//         shippingInfo,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//         paymentInfo,
//         paidAt: Date.now(),
//         user: req.user.id
//     })

//     res.status(200).json({
//         success: true,
//         order
//     })
// })

// //Get Single Order - api/v1/order/:id
// exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
//     const order = await Order.findById(req.params.id).populate('user', 'name email');
//     if(!order) {
//         return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
//     }

//     res.status(200).json({
//         success: true,
//         order
//     })
// })

// import asyncHandler from 'express-async-handler';
// import Order from '../models/orderModel.js';
// import Product from '../models/productModel.js';
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
 const asyncHandler = require('express-async-handler')

//Create New Order - api/order/new
// const newOrder =  asyncHandler( async (req, res, next) => {
//     const {
//         orderItems,
//         shippingInfo,
//         itemsPrice,
//         shippingPrice,
//         totalPrice,
//         paymentInfo
//     } = req.body;
//     const order = await orderModel.create({
//         orderItems,
//         shippingInfo,
//         itemsPrice,
//         shippingPrice,
//         totalPrice,
//         paymentInfo,
//         paidAt: Date.now(),
//         user: req.user.id
//     })
//     res.status(200).json(`Order created succesfully`)
// });


//Create New Order - api/v1/order/new
const newOrder =  asyncHandler( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await orderModel.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })

    res.status(200).json({
        success: true,
        order
    })
})




//Get Single Order - api/order/:id
const getSingleOrder = asyncHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id).populate('user', 'name email');
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        order
    })
});
//Get Loggedin User Orders - /api/order/
const myOrders = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find({user: req.user.id});
    res.status(200).json({
        success: true,
        orders
})
});
//Admin: Get All Orders - api/order/orders
const getAllOrders =asyncHandler( async (req, res) => {
    try {
      const orders = await orderModel.find().populate('user').populate('orderItems.product');
      let totalAmount = 0;
      orders.forEach(order => {
        totalAmount += order.totalPrice;
      });
      res.status(200).json({
        success: true,
        totalAmount,
        orders
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  });
//Admin: Update Order / Order Status - api/v1/order/:id
const updateOrder = asyncHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order has already been delivered!', 400));
    }
    for (const orderItem of order.orderItems) {
        await updateStock(orderItem.product, orderItem.quantity);
    }
    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).json(`Updated successfully`);
});
async function updateStock(productId, quantity) {
    const product = await productModel .findById(productId);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}
// Admin: Delete Order - api/v1/order/:id
const deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404));
    }
    await orderModel.deleteOne({ _id: req.params.id }); // Use deleteOne to remove the order
    res.status(200).json(`Order deleted successfully`);
});



module.exports = {
  newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
  };
  
