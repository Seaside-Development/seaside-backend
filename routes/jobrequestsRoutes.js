const express = require('express');
const router = express.Router();
const {searchJobrequests, setJobrequest, updateJobrequest, deleteJobrequest, getJobrequestById, getJobrequestByContractorId} = require('../controllers/jobrequestsController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/searchJobs', protect, searchJobrequests);
router.post('/createjob', protect, setJobrequest);
router.put('/updatejob/:id', protect,updateJobrequest);
router.delete('/removejob/:id', protect,deleteJobrequest);
router.get('myjobs/:id', protect, getJobrequestById);
router.get('/contractorJobs/:id', protect, getJobrequestByContractorId);

module.exports = router;