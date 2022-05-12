const express = require('express');
const router = express.Router();
const {getContractors, registerContractor, updateContractors, deleteContractors, getMe} = require('../controllers/contractorController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/', getContractors);
router.post('/becomeContractor', registerContractor);
router.put('/update/:id', updateContractors);
router.delete('/remove/:id', deleteContractors);
router.get('/me', protect, getMe);

module.exports = router;