const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Contractors = require('../models/contractorModel');
const uuid=require("uuid")
let alert = require('alert');


// @desc    Get all Service
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler (async (req, res) => {
  if (req.cookies.auth){
    const users = await User.find();
    res.status(200).json(users);
  }
  else
    res.redirect('/401')
  
})

//Checking if user is contractor or not
const checkUser = asyncHandler (async (req, res) => {
    const id = req.cookies.auth
    const findUser = await Contractors.findById(id);
    const user = await User.findById(id);

    if(findUser) {
      isAContractor = true;
    }
    else {
      isAContractor = false;
    }
    res.render("useraccount", {isAContractor})
    console.log("are they a contractor:", isAContractor)
  return isAContractor
})


// @desc    Set/Register a new User
// @route   POST /users/register
// @access  Public
const registerUser = asyncHandler (async (req, res) => {
  const {firstName, lastName, username, email, avatar, password, telephone} = req.body;
  if(!firstName || !lastName || !username || !email || !password || !telephone) {
      res.status(400)
      throw new Error('Please add all fields');
  } 
  // check if password length is greater than 8.
  if(password.length < 7) {
    //res.status(400);
  alert('Password must be at least 8 characters long');
  }

  // check if user exists
  const userExist = await User.findOne({ email });
  if(userExist) {
    // res.status(400)
    alert('User already exists');
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName, 
    lastName,
    username, 
    email, 
    avatar, 
    password: hashedPassword, 
    telephone,
  })  

  if (user) {
    res.status(201, 
      {
      _id: user._id,
      username: user.username,
      email: user.email, 
      avatar: user.avatar,
      telephone: user.telephone,
      token: generateToken(user._id),
    }
    )
  } else {
    //res.status(400)
    alert('Invalid user data')
  }
  res.redirect('/',{title: 'Welcome'}, 201);
})

// @desc    Update user
// @route   PUT /api/users/update/:id
// @access  Public
const updateUser = asyncHandler (async (req, res) => {
  const id = req.cookies.auth;
  const user = await User.findById(id);

  if(!user) {
    res.status(400)
    throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
})

// @desc    Delete Users
// @route   DELETE /api/users/delete:id
// @access  Public
const deleteUser = asyncHandler (async (req, res) => {
  const id = req.cookies.auth;
  const user = await User.findById(req.params.id);
  if(!User) {
    res.status(400)
    throw new Error('User not found');
  }

  await User.remove(); // remove user  
  res.status(200).json({message: `Delete User Account ${req.params.id}`});
})

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email }) || await Contractors.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    
    res.cookie('auth', user.id)
    res.redirect('/createjobform', 200, 
    {
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      title: 'User Login Form',
    })    
  } else {
   res.status(400, 'Invalid email or password');
  }
})

// @desc    Logout user
// @route   GET /users/logout
// @access  Public
const logout = asyncHandler(async (req, res) => {
  if (req.cookies.auth){
    console.log(req.cookies.auth)
    console.log(res.cookie)

    res.clearCookie('auth')
    console.log(res.cookie)
    //res.end()
    res.redirect('/')
  }
  else {
    res.redirect('/401')
  }
})


// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json("Well done")
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = {
    getUsers, registerUser, updateUser, deleteUser, getMe, loginUser, logout, checkUser
}