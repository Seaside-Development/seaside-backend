const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Get all Service
// @route GET /api/users
// @access Private
const getUsers = asyncHandler (async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
})

// @desc Set/Register a new User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler (async (req, res) => {
  const { username, email, avatar, password, telephone } = req.body;

  if(!username || !email || !avatar || !password || !telephone) {
      res.status(400)
      throw new Error('Please add all fields');
  } 

  // check if user exists
  const userExist = await User.findOne({ email });
  if(userExist) {
      res.status(400)
      throw new Error('User already exist');
  }

  // Create user
  const user = await User.create({
    username,
    email,
    avatar,
    password,
    telephone
  })
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      telephone: user.telephone,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Update user
// @route PUT /api/users/update/:id
// @access Public
const updateUser = asyncHandler (async (req, res) => {
  const goal = await User.findById(req.params.id);

  if(!User) {
      res.status(400)
      throw new Error('User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
})

// @desc Delete Users
// @route DELETE /api/users/delete:id
// @access Public
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
  res.json({ message: 'Login successful' });
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


module.exports = {
    getUsers, registerUser, updateUser, deleteUser, getMe, loginUser
}