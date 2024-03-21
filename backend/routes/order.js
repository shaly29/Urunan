const express = require('express');
const router = express.Router();
const {newOrder, getSingleOrder, getAllOrders, updateOrder, deleteOrder, myOrders} = require('../controllers/orderController');

const authMiddleware = require('../middlewares/authMiddleware');



router.route('/order/new').post(authMiddleware,newOrder);
router.route('/singleorder/:id').get(authMiddleware,getSingleOrder);
router.route('/allorders').get(authMiddleware,getAllOrders);
router.route('/updateorder/:id').put(authMiddleware,updateOrder);
router.route('/updateorder/:id').delete(authMiddleware,deleteOrder);
router.route('/myorders').get(authMiddleware,myOrders);


module.exports = router;

