const express = require('express');
const router = express.Router();
const {
    searchJobrequests, 
    findContractors, 
    setJobrequest, 
    updateJobrequest, 
    deleteJobrequest, 
    findJobrequestById,
    getJobrequestById, 
    getJobrequestByContractorId,
    addContractor
} = require('../controllers/jobrequestsController');// Importing the serviceController

router.get('/searchJobs/:page', searchJobrequests);
router.get('/findcontractors?', findContractors);
router.post('/createjob', setJobrequest);
router.put('/updatejob?',updateJobrequest);
router.delete('/removejob/:id',deleteJobrequest);
router.get('/contractorJobs/:page', getJobrequestByContractorId);
router.put('/addcontractor/:contractorid&:jobid', addContractor);
router.get('/findJobrequestById/:id', findJobrequestById);

module.exports = router;