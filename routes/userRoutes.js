const express = require('express');
const passport = require('passport');
const router = express.Router();
const {getUsers, loginUser, registerUser, updateUser, deleteUser, getMe, logout} = require('../controllers/userController.js');// Importing the serviceController
const {protect}=require("../middleware/authMiddleware")

router.get('/user', getUsers);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/register', registerUser);
router.put('/update', updateUser)
router.delete('/remove/:id', deleteUser);
router.get('/me', protect.authenticate("cookie",{session:false}),getMe);

module.exports = router;