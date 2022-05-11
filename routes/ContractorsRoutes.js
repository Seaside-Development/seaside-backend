const express = require('express');
const router = express.Router();
const {getContractors, setContractors, updateContractors, deleteContractors, getMe} = require('../controllers/contractorController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/', protect,getContractors);
router.post('/contractors/', protect,setContractors);
router.put('/update/:id', protect,updateContractors);
router.delete('/remove/:id' , protect, deleteContractors);
router.get('/me', protect, getMe);

module.exports = router;