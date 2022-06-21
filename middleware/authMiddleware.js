const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const passport=require("passport")
const User = require('../models/userModel');
const Contractor = require('../models/contractorModel');
const CookieStrategy=require("passport-cookie")


console.log(User)


const protect= passport.use(new CookieStrategy({
        cookieName: 'auth',
        passReqToCallback: true
      },
      
      

      function(req, token ,done) {
        
        console.log(token)
        
        User.findById(token , function(err, user) {
          console.log("nice")
          if (err) {
            return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user);
        });
  })
);



// const protectCookie = passport.use(new CookieStrategy({
//   cookieName: 'auth',
//       }, 
      
//       function(req, token, done) {
//         Contractor.findById({ token: token }, function(err, user) {
//           if (err) { return done(err); }
//           if (!user) { return done(null, false); }
//           return done(null, user);
//         });
//   })
// );



const protected = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})






module.exports = { protect }

// for more information visit --> https://jwt.io/