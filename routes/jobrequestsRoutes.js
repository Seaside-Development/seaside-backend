const express = require('express');
const router = express.Router();
const {getJobrequests, setJobrequest, updateJobrequest, deleteJobrequest} = require('../controllers/jobrequestsController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.route('/').get(getJobrequests).post(protect, setJobrequest);
router.route('/:id').put(protect, updateJobrequest).delete(protect, deleteJobrequest);

module.exports = router;