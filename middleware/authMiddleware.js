const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const passport=require("passport")
const User = require('../models/userModel');
const CookieStrategy=require("passport-cookie")
const http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());

const protect = passport.use(new CookieStrategy({
        cookieName: 'auth',
      }, 
      
      function(req, token, done) {
        User.findByToken({ token: token }, function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user);
        });
      })

    );
    // let token
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     try {
    //         // Get token from header
    //         token = req.headers.authorization.split(' ')[1]

    //         // Verify token
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //         // Get user from token
    //         req.user = await User.findById(decoded.id).select('-password')
    //         next()
    //     } catch (err) {
    //         console.log(err)
    //         res.status(401)
    //         throw new Error('Unauthorized Access')
    //     }
    // }

    // if(!token) {
    //     res.status(401)
    //     throw new Error('Unauthorized Access, please login')
    // }
// })

module.exports = { protect};

// for more information visit --> https://jwt.io/