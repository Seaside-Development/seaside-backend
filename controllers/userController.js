const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
// @desc Get all Service
// @route GET /api/services
// @access Private
const getUsers = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Get User account'});
})

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

// @desc Set Service
// @route POST /api/services
// @access Private
const setUser = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    } 
    res.status(200).json({message: 'Set User Account'});
})

// @desc Update Service
// @route PUT /api/services/:id
// @access Private
const updateUser = asyncHandler (async (req, res) => {
    res.status(200).json({message: `update User Account ${req.params.id}`});
})

// @desc Delete Service
// @route DELETE /api/services/:id
// @access Private
const deleteUser = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Delete User Account ${req.params.id}`});
})

module.exports = {
    getUsers, setUser, updateUser, deleteUser, getAllUsers
}