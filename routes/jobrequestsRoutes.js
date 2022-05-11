const express = require('express');
const router = express.Router();
const {getJobrequests, setJobrequest, updateJobrequest, deleteJobrequest} = require('../controllers/jobrequestsController');// Importing the serviceController
const {protect} = require('../middleware/authMiddleware');// Importing the authMiddleware

router.get('/', protect,getJobrequests);
router.post('/createjob', protect, setJobrequest);
router.put('/updatejob/:id', protect,updateJobrequest);
router.delete('/removejob/:id', protect,deleteJobrequest);

module.exports = router;