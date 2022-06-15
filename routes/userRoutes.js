const express = require('express');
const router = express.Router();
const {getUsers, loginUser, registerUser, updateUser, deleteUser, getMe, logout} = require('../controllers/userController.js');// Importing the serviceController

router.get('/user', getUsers);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/register', registerUser);
router.put('/update/:id', updateUser)
router.delete('/remove/:id', deleteUser);
router.get('/me', getMe);

module.exports = router;