const express = require('express');
const router = express.Router();
const {getContractors, setContractors, updateContractors, deleteContractors} = require('../controllers/contractorController');// Importing the serviceController

router.route('/contractors').get(getContractors).post(setContractors);
router.route('/contractors/:id').put(updateContractors).delete(deleteContractors);

module.exports = router;