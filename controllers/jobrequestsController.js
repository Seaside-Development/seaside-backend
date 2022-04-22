const asyncHandler = require('express-async-handler');

const JobRequests = require('../models/jobRequestsModel');

// @desc Get all Service
// @route GET /api/services
// @access Private
const getJobrequests = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Get Rob Requests'});
})

// @desc Set Service
// @route POST /api/services
// @access Private
const setJobrequest = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    } 
    res.status(200).json({message: 'Set Job Request'});
})

// @desc Update Service
// @route PUT /api/services/:id
// @access Private
const updateJobrequest = asyncHandler (async (req, res) => {
    res.status(200).json({message: `update Job Request ${req.params.id}`});
})

// @desc Delete Service
// @route DELETE /api/services/:id
// @access Private
const deleteJobrequest = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Delete Job Requests ${req.params.id}`});
})

module.exports = {
    getJobrequests, setJobrequest, updateJobrequest, deleteJobrequest
}