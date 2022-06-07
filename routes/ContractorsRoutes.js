const express = require('express');
const router = express.Router();
const {getContractors, registerContractor, 
    updateContractors, deleteContractors, getMe, 
    getContractorsBySearch, loginContractor
} 
    = require('../controllers/contractorController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/', protect, getContractors);
router.post('/regcontractor', registerContractor);
router.put('/update/:id', protect, updateContractors);
router.delete('/remove/:id' , protect, deleteContractors);
router.get('/me', protect, getMe);
router.get('/search', getContractorsBySearch);
router.post('/loginPro', loginContractor);

module.exports = router;