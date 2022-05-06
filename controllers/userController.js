const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Get all Service
// @route GET /api/services
// @access Private
const getUsers = asyncHandler (async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
})

// @desc Set new User
// @route POST /api/services
// @access Public
const setUser = asyncHandler (async (req, res) => {
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

// @desc Update Service
// @route PUT /api/v1/users/:id
// @access Private
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
// @route DELETE /api/services/:id
// @access Private
const deleteUser = asyncHandler (async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!User) {
    res.status(400)
    throw new Error('User not found');
  }

  await User.remove(); // remove user  
  res.status(200).json({message: `Delete User Account ${req.params.id}`});
})

// @desc Get All User
// @route GET /api/services/:id
// @access Private
const getAllUsers = asyncHandler (async (req, res) => {
    try {
      let query = User.find();
  
      const user = parseInt(req.query.user) || 1;
      const userSize = parseInt(req.query.limit) || 4;
      const skip = (user - 1) * userSize;
      const total = await User.countDocuments();
  
      const users = Math.ceil(total / userSize);
  
      query = query.skip(skip).limit(userSize);
  
      if (user > users) {
        return res.status(404).json({
          status: "fail",
          message: "No page found",
        });
      }
  
      const result = await query;
  
      res.status(200).json({
        status: "success",
        count: result.length,
        user,
        users,
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "Server Error",
      });
    }
  });

module.exports = {
    getUsers, setUser, updateUser, deleteUser, getAllUsers
}