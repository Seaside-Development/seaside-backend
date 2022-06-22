const express = require('express');
const router = express.Router();
const 
{
    getContractors, registerContractor, 
    updateContractors, deleteContractors, getMe, 
    loginContractor, getContractorById
} = require('../controllers/contractorController');// Importing the serviceController
const {protectContractor}=require("../middleware/authMiddleware")

router.get('/findContractor', getContractors); //secure
router.post('/regcontractor', registerContractor); //Secure
router.get('/:id',getContractorById); //Secure
router.put('/update/:id',updateContractors); //Secure
router.delete('/remove/:id',deleteContractors); //Secure
router.get('/me', getMe);
router.post('/loginPro',loginContractor); //Secure


// router.get('/findContractor', getContractors); //secure
// router.post('/regcontractor', registerContractor); //Secure
// router.get('/:id', protectContractor.authenticate("cookie",{session:false}),getContractorById); //Secure
// router.put('/update/:id', protectContractor.authenticate("cookie",{session:false}),updateContractors); //Secure
// router.delete('/remove/:id', protectContractor.authenticate("cookie",{session:false}),deleteContractors); //Secure
// router.get('/me', getMe);
// router.post('/loginPro', protectContractor.authenticate("cookie",{session:false}),loginContractor); //Secure
module.exports = router;