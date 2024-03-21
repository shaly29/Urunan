const express = require('express');
const router = express.Router();
const {sendEmail} = require('../controllers/contactController');
// const { isAuthenticatedUser } = require('../middlewares/authMiddleware');

// contact
router.post('/send-email', sendEmail);
// router.route('/order').post(createOrder);

module.exports = router;
