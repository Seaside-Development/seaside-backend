const asyncHandler = require('express-async-handler');
const Contractors = require('../models/contractorModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const uuid=require("uuid")
let alert = require('alert');


// @desc    check user is a contractor or not
const amIAContractor = asyncHandler (async (req, res) => {
  if (req.cookies.auth){
    const id = req.cookies.auth;
    const contractor = await Contractors.findById(id);
    if(contractor) {
      result = true;
    }
    else {
      result = false;
    }
    return result;
  }
  else
    res.redirect('/401')
}
)

// @desc    Get all Service
// @route   GET /api/contractor
// @access  Private
const getContractors = asyncHandler (async (req, res) => {
    const contractor = await Contractors.find();
    res.status(200).json(contractor);
})

// @desc    Login the contractor
// @route   POST /api/contractor/login
// @access  Public
const loginContractor = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    
    // Check if email and password exist
    if(!email || !password) {
        res.status(400)
        throw new Error('Please provide an email and password');
    }
    // Check if user exists and password is correct
    const contractor = await Contractors.findOne({email});
    console.log(contractor)
    if (contractor && (await bcrypt.compare(password, contractor.password))) {
      console.log(contractor)
      console.log('Hola')
      res.cookie('auth', contractor.id )
      res.redirect('/', 200)     
    // {
    //   _id: contractor.id,
    //   email: contractor.email,
    //   token: generateToken(user._id),
    //   title: 'Contractor Login Form',
    // }
  } else {
   res.status(400, 'Invalid email or password');
  }
})


// @desc    Set/Register a new contractor
// @route   POST /api/contractor/register
// @access  Public
const registerContractor = asyncHandler (async (req, res) => {
    // Body request
    const {user, contractorName, email, telephone, businessDescription, operatingLocations, industry, services, title, rating, completedJobs, totalRatings, avgRating, password} = req.body;
  
    console.log(`${contractorName}, ${email}, ${telephone}, ${businessDescription}, ${operatingLocations}, ${industry}, ${services}`)


    if(!contractorName || !email || !businessDescription || !operatingLocations || !industry || !services || !telephone || !password) {
      console.log(typeof operatingLocations)
      console.log(`${contractorName}, ${email}, ${telephone}, ${businessDescription}, ${operatingLocations}, ${industry}, ${services}`)
        res.status(400)
        throw new Error('Please add all fields');
    } 
    
    // check if user exists
    const contractorExist = await Contractors.findOne({ email });
    if(contractorExist) {
        res.status(400)
        throw new Error('Contractor already exist');
    }

      // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

    // Create contractor object
    const contractor = await Contractors.create({
        user: req.cookies.auth,
        // title,
        contractorName, 
        email, 
        password: hashedPassword,
        businessDescription, 
        operatingLocations, 
        industry,
        services, 
        telephone,
    })
    res.status(200).json(contractor);
    if (Contractors) {
      res.status(201).json({
        _id: Contractors._id, 
        user,
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

// @desc    GET Contractor
// @route   GET /contractor/:id
// @access  Public
const getContractorById = asyncHandler (async (req, res) => {
  const id = req.params.id;
    await Contractors.findById(id)
        .then(result => {
        res.render('contractoroverview', { contractor: result, title: 'Contractor Details by ID' });
        //res.status(200).json(result);
    })
    .catch(err => {
        res.status(404)
        throw new Error('Contractor not found');
    })
});
  
// @desc    Update user
// @route   PUT /contractor/update/:id
// @access  Public
const updateContractors = asyncHandler (async (req, res) => {
  const contractor = await Contractors.findById(req.params.id);
  
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
    const contractor = await Contractors.findById(req.params.id);
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
    getContractors, registerContractor, updateContractors, deleteContractors, getMe, loginContractor, getContractorById, amIAContractor
}