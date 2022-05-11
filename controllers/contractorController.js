const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const Contractor = require('../models/contractorModel');


// @desc    Get all Service
// @route   GET /api/contractor
// @access  Private
const getContractors = asyncHandler (async (req, res) => {
    const contractor = await Contractor.find();
  
    res.status(200).json(contractor);
})
  
  // @desc    Set/Register a new contractor
  // @route   POST /api/contractor/register
  // @access  Public
const registerContractor = asyncHandler (async (req, res) => {
    const {userID, contractorName, email, businessDescription, operatingLocations, services, rating, industry} = req.body;
  
    if(!contractorName || !email || !businessDescription || !operatingLocations || !services || !industries) {
        res.status(400)
        throw new Error('Please add all fields');
    } 
    
    // check if user exists
    const contractorExist = await Contractor.findOne({ email });
    if(contractorExist) {
        res.status(400)
        throw new Error('Contractor already exist');
    }

    // Create contractor
    const contractor = await Contractor.create({
        userID: req.user._id,
        contractorName, 
        email, 
        businessDescription, 
        operatingLocations, 
        services, 
        industries,
    })
    res.status(200).json(contractor);

    if (Contractor) {
      res.status(201).json({
        _id: Contractor._id, 
        userID,
        contractorName, 
        email, 
        businessDescription, 
        operatingLocations, 
        services, 
        industries
      })
    } else {
      res.status(400)
      throw new Error('Invalid Contractor data')
    }
  })
  
  // @desc    Update user
  // @route   PUT /api/contractor/update/:id
  // @access  Public
  const updateContractors = asyncHandler (async (req, res) => {
    const contractor = await Contractor.findById(req.params.id);
  
    if(!Contractor) {
        res.status(400)
        throw new Error('Contractor not found');
    }
  
    const updateContractors = await Contractor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.status(200).json(updateContractors);
})
  
// @desc    Delete Users
// @route   DELETE /api/contractor/delete:id
// @access  Public
const deleteContractors = asyncHandler (async (req, res) => {
    const contractor = await Contractor.findById(req.params.id);
    if(!Contractor) {
      res.status(400)
      throw new Error('User not found');
    }
  
    await Contractor.remove(); // remove user  
    res.status(200).json({message: `Delete Contractor Account ${req.params.id}`});
  })
  
  // @desc    Get user data
  // @route   GET /api/contractor/me
  // @access  Private
  const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.contractor)
  })
  

module.exports = {
    getContractors, registerContractor, updateContractors, deleteContractors, getMe
}