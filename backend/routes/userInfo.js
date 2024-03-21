const express = require('express');
const router = express.Router();
const {createOrder, checkUserId} = require('../controllers/userInformation');

router.route('/create-order').post(createOrder);
router.route('/check-user-orders/:userId').get(checkUserId);

module.exports = router;
