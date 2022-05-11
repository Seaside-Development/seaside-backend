const asyncHandler = require('express-async-handler');
const JobRequests = require('../models/jobRequestsModel');

// @desc    Get all Service
// @route   GET /api/services
// @access  Public
const getJobrequests = asyncHandler (async (req, res) => {
    const jobrequests = await JobRequests.find( {user: req.user._id});
    res.status(200).json(jobrequests);
})

// @desc    Set Service
// @route   POST /api/services
// @access  Private
const setJobrequest = asyncHandler (async (req, res) => {
    const {title, complexity, contractorID, user, industry, description, length, parish, status, startdate, endDate, reviews} = req.body;

    if(!title || !complexity || !industry || !description || !length || !parish || !status || !startdate) {
        res.status(400)
        throw new Error('Please add required fields');
    }

    const jobrequest = await JobRequests.create({
        title, 
        complexity, 
        contractorID, 
        industry, 
        description, 
        length, 
        parish, 
        status, 
        startdate, 
        endDate, 
        reviews,
        user: req.user._id
    });
    res.status(200).json(jobrequest);
})

// @desc    Add Service review
// @route   PUT /api/services/review/:id
// @access  Private
const addReview = asyncHandler (async (req, res) => {
    // get the review and change the status to completed
    const {reviews, status = 'Completed'} = req.body;
    
    // check if the job exist
    const jobrequest = await JobRequests.findByIdAndUpdate(req.params.id) 
    if(!jobrequest) {
        res.status(400)
        throw new Error('Job not found');
    }
    // check if the review is empty
    if(!reviews || !status) {
        res.status(400)
        throw new Error('Please add required fields');
    }

    // Checkl if the user is found
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // check if user is the same as the user who created the service
    if (jobrequest.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error('User not authorized to add review')
    }

    // add the review to the contractor model
        

    //update the service
    const updatedJobrequest = await JobRequests.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedJobrequest);
})

// @desc    Update Service
// @route   PUT /api/services/update/:id
// @access  Private
const updateJobrequest = asyncHandler (async (req, res) => {
    const jobrequest = await JobRequests.findByIdAndUpdate(req.params.id)
    if(!jobrequest) {
        res.status(404)
        throw new Error('Jobrequest not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (jobrequest.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized to update this request')
    }

  //update the goal or create a new one
  const updatedJobrequest = await JobRequests.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });
    res.status(200).json(updatedJobrequest);
})

// @desc    Delete Service
// @route   DELETE /api/services/remove/:id
// @access  Private
const deleteJobrequest = asyncHandler (async (req, res) => {
    //check if the jobrequest exists
    const jobrequest = await JobRequests.findById(req.params.id);
    if(!jobrequest) {
        res.status(404)
        throw new Error('Jobrequest not found');
    }
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the jobrequest user
    if (jobrequest.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized to delete this request')
    }
    await jobrequest.remove();

    res.status(200).json({message: `Delete Job Requests ${req.params.id}`});
})

module.exports = {
    getJobrequests, setJobrequest, updateJobrequest, deleteJobrequest
}