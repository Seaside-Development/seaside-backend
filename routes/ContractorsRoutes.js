const express = require('express');
const router = express.Router();
const {getContractors, registerContractor, updateContractors, deleteContractors, getMe} = require('../controllers/contractorController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

<<<<<<< HEAD
router.get('/', getContractors);
router.post('/becomeContractor', registerContractor);
router.put('/update/:id', updateContractors);
router.delete('/remove/:id', deleteContractors);
=======

router.get('/', protect,getContractors);
router.post('/contractors/', protect,setContractors);
router.put('/update/:id', protect,updateContractors);
router.delete('/remove/:id' , protect, deleteContractors);
>>>>>>> 6be952bd66c3df61613a397b16f51a21632d3ba9
router.get('/me', protect, getMe);

module.exports = router;