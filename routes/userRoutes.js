const express = require('express');
const router = express.Router();
const {getUsers, loginUser, registerUser, updateUser, deleteUser} = require('../controllers/userController.js');// Importing the serviceController

router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.put('/update/:id', updateUser)
router.delete('/remove/:id', deleteUser);

module.exports = router;