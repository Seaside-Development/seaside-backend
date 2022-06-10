const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { redirect } = require('express/lib/response');

// @desc    Get all Service
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler (async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
})

// @desc    Set/Register a new User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler (async (req, res) => {
  const {firstName, lastName, username, email, avatar, password, telephone} = req.body;
  if(!firstName || !lastName || !username || !email || !password || !telephone) {
      res.status(400)
      throw new Error('Please add all fields');
  } 
  // check if password length is greater than 8.
  if(password.length < 7) {
    res.status(400);
    throw new Error('Password must be at least 8 characters long');
  }

  // check if user exists
  const userExist = await User.findOne({ email });
  if(userExist) {
      res.status(400)
      throw new Error('User already exist');
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

  res.redirect('/createjobform', 200, 
    {
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      title: 'User Login Form',
    })

  if (user) {
    res.redirect('/createjobform', 201, {
      _id: user._id,
      username: user.username,
      email: user.email, 
      avatar: user.avatar,
      telephone: user.telephone,
      token: generateToken(user._id),
    },  'User created successfully')
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
  res.redirect('signup',{
    user: user,
    title: 'User Registration Form',
  });
})

// @desc    Update user
// @route   PUT /api/users/update/:id
// @access  Public
const updateUser = asyncHandler (async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
      res.status(400)
      throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
})

// @desc    Delete Users
// @route   DELETE /api/users/delete:id
// @access  Public
const deleteUser = asyncHandler (async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!User) {
    res.status(400)
    throw new Error('User not found');
  }

  await User.remove(); // remove user  
  res.status(200).json({message: `Delete User Account ${req.params.id}`});
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
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

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = {
    getUsers, registerUser, updateUser, deleteUser, getMe, loginUser
}