const express = require('express');
const router = express.Router();
const {getUsers, loginUser, registerUser, updateUser, deleteUser, getMe} = require('../controllers/userController.js');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware.js');// Importing the authMiddleware

router.get('/user', getUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/update/:id', protect,updateUser)
router.delete('/remove/:id', protect,deleteUser);
router.get('/me', getMe);

module.exports = router;