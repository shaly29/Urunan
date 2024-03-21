const express = require('express');
const router = express.Router();

 const {protect}=require('../middlewares/authMiddleware')

const userController = require('../controllers/userController'); 
// router.post('/auth', userController.authUser);


router.post('/signup',userController.registerUser);
router.post('/login', userController.authUser);
router.post('/logout',userController.logoutUser);
// router.route('/profile').get(authMiddleware,userController.getUserProfile).put(authMiddleware,userController.updateUserProfile);
// router.post('/password/forgot',userController.forgotPassword);
// router.post('/password/reset/:token',userController.resetPassword);



// admin
router.get('/users',userController.getAllUser);
// router.get('/users/:id' ,userController.getUserById);
// router.put('/users/:id',protect, userController.updateUserById);
// router.post('/admin/signup',protect, userController.createUser);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;

