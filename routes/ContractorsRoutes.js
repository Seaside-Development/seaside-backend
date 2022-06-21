const express = require('express');
const router = express.Router();
const 
{
    getContractors, registerContractor, 
    updateContractors, deleteContractors, getMe, 
    loginContractor, getContractorById
} = require('../controllers/contractorController');// Importing the serviceController

router.get('/findContractor', getContractors);
router.post('/regcontractor', registerContractor);
router.get('/:id', getContractorById);
router.put('/update/:id', updateContractors);
router.delete('/remove/:id', deleteContractors);
router.get('/me', getMe);
router.post('/loginPro', loginContractor);

module.exports = router;