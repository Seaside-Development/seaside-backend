const express = require('express');
const router = express.Router();
const {
    searchJobrequests, 
    findContractors, 
    setJobrequest, 
    updateJobrequest, 
    deleteJobrequest, 
    findJobrequestById,
    addContractor,
    UpdateStatus,
    UpdatePage
} = require('../controllers/jobrequestsController');// Importing the serviceController


router.get('/searchJobs/:page', searchJobrequests); //Secure
router.get('/findcontractors?', findContractors); //Secure
router.post('/createjob', setJobrequest); //Secure
router.put('/updatejob?', updateJobrequest); //Secure
router.delete('/removejob/:id',deleteJobrequest); //remove job secure
// router.get('/contractorJobs/:page', protectContractor.authenticate("cookie",{session:false}),getJobrequestByContractorId); // secure
router.put('/addcontractor/:contractorid&:jobid', addContractor); //Secure
router.get('/UpdatePage/:id', UpdatePage)
router.get('/findJobrequestById/:id', findJobrequestById); //secure


module.exports = router;