const express = require('express');
const router = express.Router();
const {getUsers, loginUser, registerUser, updateUser, deleteUser, getMe} = require('../controllers/userController.js');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware.js');// Importing the authMiddleware

router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/register', protect,registerUser);
router.put('/update/:id', protect,updateUser)
router.delete('/remove/:id', protect,deleteUser);
router.get('/me', protect, getMe);

module.exports = router;