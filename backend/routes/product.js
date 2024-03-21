const express = require('express');
const { getProducts, getSingleProduct,deleteProduct,updateProduct, createProduct, createReview } = require('../controllers/productController');
const router = express.Router();
const upload = require ('../utils/multer')
const authMiddleware=require('../middlewares/authMiddleware')

router.post('/product/new', upload.single("image"), createProduct);
router.get('/products',getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').put(updateProduct);
router.route('/review').put( authMiddleware,createReview);
module.exports = router;
