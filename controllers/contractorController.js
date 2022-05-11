const asyncHandler = require('express-async-handler');

const Contractor = require('../models/contractorModel');

// @desc Get all Contractors
// @route GET /api/contractors
// @access Private
const getContractors = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Get Contractors'});
})

// @desc Set Service
// @route POST /api/services
// @access Private
const setContractors = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    } 
    res.status(200).json({message: 'Set Contractor'});
})

// @desc Update Service
// @route PUT /api/services/:id
// @access Private
const updateContractors = asyncHandler (async (req, res) => {
    res.status(200).json({message: `update Contractor ${req.params.id}`});
})

// @desc Delete Service
// @route DELETE /api/services/:id
// @access Private
const deleteContractors = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Delete Contractor ${req.params.id}`});
})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.Contractor)
  })
  

module.exports = {
    getContractors, setContractors, updateContractors, deleteContractors, getMe
}