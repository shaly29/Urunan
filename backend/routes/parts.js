const express = require('express');
const { getParts, getSinglePart,deletePart,updatePart, createPart } = require('../controllers/partsController');
const upload = require ('../utils/multer')
// const authMiddleware=require("../middlewares/authMiddleware")
const router = express.Router();

router.post('/part/new', upload.single("image"), createPart);
// router.route('/part/new').post(createPart);

router.route('/admin/parts').get(getParts);
router.route('/admin/part/:id').get(getSinglePart);
router.route('/admin/part/:id').delete(deletePart);
router.route('/part/:id').put(updatePart);
module.exports = router;