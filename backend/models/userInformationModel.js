const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    userName: String,
    phoneNo: Number,
    address: String,
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
      }],
    
});

const userInfoModel = mongoose.model('userInfo', orderSchema);

module.exports = userInfoModel;