const mongoose = require('mongoose');

const addtocardSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    createdAt: Date
})
const addtocardModel = mongoose.model('Addtocard', addtocardSchema);

module.exports = addtocardModel;