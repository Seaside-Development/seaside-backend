const express = require('express');
const router = express.Router();
const {getJobrequests, setJobrequest, updateJobrequest, deleteJobrequest} = require('../controllers/jobrequestsController');// Importing the serviceController

router.route('/').get(getJobrequests).post(setJobrequest);
router.route('/:id').put(updateJobrequest).delete(deleteJobrequest);

module.exports = router;