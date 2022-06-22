const express = require('express');
const passport = require('passport');
const router = express.Router();
const {getUsers, loginUser, registerUser, updateUser, deleteUser, getMe, logout, checkUser} = require('../controllers/userController.js');// Importing the serviceController
const {protectUser}=require("../middleware/authMiddleware")

router.get('/user', protectUser.authenticate("cookie",{session:false}),getUsers);  //Secured
router.post('/login', loginUser); 
router.get('/logout', logout);
router.post('/register', registerUser); //
router.put('/update', protectUser.authenticate("cookie",{session:false}),updateUser) //Secured
router.delete('/remove/:id', protectUser.authenticate("cookie",{session:false}),deleteUser);  //Secured
router.get('/me', protectUser.authenticate("cookie",{session:false}),getMe);
router.get("checkuser", checkUser)

module.exports = router;