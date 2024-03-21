const createOrderModel = require('../models/createOrderModel');
const productModel = require('../models/productModel');

// Create Order - /api/v1/order 
exports.createOrder = async (req, res, next) => {
  try {
    const { cartItems, userId, cashOnDelivery } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0 || !userId) {
      return res.status(400).json({ success: false, error: 'Invalid request body' });
    }

    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
    const status = 'pending';
    
    const order = await createOrderModel.create({ cartItems, amount, status, userId, cashOnDelivery });

    // Updating product stock
    await Promise.all(cartItems.map(async (item) => {
      const product = await productModel.findById(item.product._id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.qty); // Ensure stock doesn't go below zero
        await product.save();
      }
    }));

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


exports.deleteOrder = async (req, res, next) => {
  try {
      const orderId = req.params.id;
      
      // Check if the order exists
      const order = await createOrderModel.findById(orderId);
      if (!order) {
          return res.status(404).json({
              success: false,
              message: 'Order not found'
          });
      }

      // Delete the order
      await createOrderModel.findByIdAndDelete(orderId);

      // Return success response
      res.json({
          success: true,
          message: 'Order deleted successfully'
      });
  } catch (error) {
      // Handle errors
      console.error('Error deleting order:', error);
      res.status(500).json({
          success: false,
          message: 'Internal server error'
      });
  }
};




// exports.updateOrder = async (req, res, next) => {
//   try {
//     const orderId = req.params.id;
//     const updatedData = req.body; // Assuming the updated data is sent in the request body
    
//     // Check if the order exists
//     const order = await createOrderModel.findById(orderId);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }

//     // Update the order
//     // You can use the findByIdAndUpdate method to update the order
//     // The third parameter { new: true } ensures that the updated document is returned
//     const updatedOrder = await createOrderModel.findByIdAndUpdate(orderId, updatedData, { new: true });

//     // Return success response with the updated order
//     res.json({
//       success: true,
//       message: 'Order updated successfully',
//       order: updatedOrder
//     });
//   } catch (error) {
//     // Handle errors
//     console.error('Error updating order:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };



 exports.updateOrder= async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, options);
      if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }
      res.json(updatedOrder);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
},


exports.getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await createOrderModel.find();

    // Send the fetched orders as a response
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Assuming the order ID is passed as a route parameter

    // Fetch the order from the database by its ID
    const order = await createOrderModel.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Send the fetched order as a response
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

