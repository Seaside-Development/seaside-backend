const asyncHandler = require('express-async-handler');
const Contractor = require('../models/contractorModel');
const User = require('../models/userModel');
const JobRequest = require('../models/jobRequestsModel');


// @desc    Get all Service
// @route   GET /api/contractor
// @access  Private
const getContractors = asyncHandler (async (req, res) => {
    const contractor = await Contractor.find();
  
    res.status(200).json(contractor);
})
  

// @desc   Get conntractor by search parameters
// @route  GET /api/contractor/search
// @access Private
const getContractorsBySearch = asyncHandler (async (req, res) => {
    const {industry, services, operatingLocations} = req.query;

    //search for the contractor by query parameters
    const contractors = await Contractor.find(
      {
        industry: {$regex: req.params.industry, $options: 'i'}, 
        services: {$regex: req.params.services, $options: 'i'}, 
        operatingLocations: {$regex: req.params.operatingLocations, $options: 'i'},
      }).exec();
    // limit the results to 5
    contractors = contractors.slice(0, 5);
    // return the contractors
    res.send(contractors);

    contractorResult = contractor.map(contractor => {
        return {
          title: contractor.title,
          contractorName: contractor.contractorName,
          email: contractor.email,
          businessDescription: contractor.businessDescription, 
          operatingLocations: contractor.operatingLocations.split(', '),
          services: contractor.services,
          avgRating: contractor.avgRating,
          id: contractor._id,
        }
    })
    res.status(200).json(contractorResult);
})

// @desc    Set/Register a new contractor
// @route   POST /api/contractor/register
// @access  Public
const registerContractor = asyncHandler (async (req, res) => {
    // Body request
    const {userID, contractorName, email, telephone, businessDescription, operatingLocations, industry, services, title, rating, completedJobs, totalRatings, avgRating} = req.body;
  
    if(!contractorName || !email || !businessDescription || !operatingLocations || !industry || !services || !title) {
        res.status(400)
        throw new Error('Please add all fields');
    } 
    
    // check if user exists
    const contractorExist = await Contractor.findOne({ email });
    if(contractorExist) {
        res.status(400)
        throw new Error('Contractor already exist');
    }

    // Create contractor object
    const contractor = await Contractor.create({
        userID: req.user.id,
        title,
        contractorName, 
        email, 
        businessDescription, 
        operatingLocations, 
        industry,
        services, 
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
  
// @desc    Delete a contractor
// @route   DELETE /api/contractor/delete:id
// @access  Public
const deleteContractors = asyncHandler (async (req, res) => {
    const contractor = await Contractor.findById(req.params.id);
    if(!Contractor) {
      res.status(400)
      throw new Error('Contractor account not found');
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
    getContractors, registerContractor, updateContractors, deleteContractors, getMe, getContractorsBySearch
}