const express = require('express');
const router = express.Router();
const {searchJobrequests, findContractors, setJobrequest, updateJobrequest, deleteJobrequest, getJobrequestById, getJobrequestByContractorId} = require('../controllers/jobrequestsController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/searchJobs', searchJobrequests);
router.get('/findcontractors?', findContractors);
router.post('/createjob', setJobrequest);
router.put('/updatejob/:id',updateJobrequest);
router.delete('/removejob/:id',deleteJobrequest);
router.get('/:id', getJobrequestById);
router.get('/contractorJobs/:id', getJobrequestByContractorId);

module.exports = router;