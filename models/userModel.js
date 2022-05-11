const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        validate: {
            validator: username => username.length > 3,
            message: "Must be longer than 3 characters"
        },
        required: [true, "Please provide a username"], 
        unique: true 
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        required: [true, "Please provide an email"], 
    },
    avatar: {type: String },
    password: { type: String, required: [true, "Please enter a password"]},
    telephone: { 
        type: String, 
        required: false,
        //match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'Please provide a valid telephone number'],
    },
    //Jobs [{type: Schema.Types.ObjectId, ref: 'JobRequests'}]
    },
    {
        timestamps: true
    }
);

module.exports.User = mongoose.model('User', userSchema);