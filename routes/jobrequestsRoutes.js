const express = require('express');
const router = express.Router();
const {getJobrequests, setJobrequest, updateJobrequest, deleteJobrequest} = require('../controllers/jobrequestsController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/', getJobrequests);
router.post('/createjob', setJobrequest);
router.put('/updatejob/:id', updateJobrequest);
router.delete('/removejob/:id', deleteJobrequest);

module.exports = router;