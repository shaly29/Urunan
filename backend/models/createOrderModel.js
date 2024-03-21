const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
    cashOnDelivery: Boolean,
    createdAt: Date
})


const createOrderModel= mongoose.model('create-order', orderSchema);

module.exports = createOrderModel;