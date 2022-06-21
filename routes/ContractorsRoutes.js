const express = require('express');
const router = express.Router();
const 
{
    getContractors, registerContractor, 
    updateContractors, deleteContractors, getMe, 
    loginContractor, getContractorById
} = require('../controllers/contractorController');// Importing the serviceController

router.get('/findContractor', getContractors); //secure
router.post('/regcontractor', registerContractor); //Secure
router.get('/:id', getContractorById); //Secure
router.put('/update/:id', updateContractors); //Secure
router.delete('/remove/:id', deleteContractors); //Secure
router.get('/me', getMe);
router.post('/loginPro', loginContractor); //Secure

module.exports = router;