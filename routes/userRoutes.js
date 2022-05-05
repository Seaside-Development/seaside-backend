const express = require('express');
const router = express.Router();
const {getUsers, setUser, updateUser, deleteUser, getAllUsers} = require('../controllers/userController.js');// Importing the serviceController

router.route('/').get(getUsers, getAllUsers).post(setUser);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;