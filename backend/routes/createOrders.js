const express = require('express');
const router = express.Router();
const {createOrder, deleteOrder, updateOrder, getOrders, getSingleOrder} = require('../controllers/createOrder');

router.route('/order').post(createOrder);
router.route('/order').get(getOrders);
router.route('/order/:id').delete(deleteOrder);
router.route('/order/:id').put(updateOrder);
router.route('/order/:id').get(getSingleOrder);
module.exports = router;
