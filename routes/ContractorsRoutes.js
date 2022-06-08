const express = require('express');
const router = express.Router();
const {getContractors, registerContractor, 
    updateContractors, deleteContractors, getMe, 
    getContractorsBySearch, loginContractor
} 
    = require('../controllers/contractorController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/', getContractors);
router.post('/regcontractor', registerContractor);
router.put('/update/:id', updateContractors);
router.delete('/remove/:id', deleteContractors);
router.get('/me', getMe);
router.get('/search', getContractorsBySearch);
router.post('/loginPro', loginContractor);

module.exports = router;