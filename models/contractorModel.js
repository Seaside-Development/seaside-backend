const mongoose = require('mongoose');
const  services = require('./servicesModel');
const User = require('./usersModel');

const contractorSchema = mongoose.Schema({
    // must have a user reference, is an array because contractors can have multiple users
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    contractorName: {type: String, required: [true, 'Please provide a name']},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        required: [true, "Please provide an email"], 
    },
    telephone: {type: String, required: [true, 'Please provide a telephone number']},
    businessDescription: { type: String, required: true, default: '' },                         
    operatingLocations: [{
        type: String,
        enum: [
            'St. Lucy',
            'St. Peter',
            'St. James',
            'St. Andrew',
            'St. Thomas',
            'St. Joseph',
            'St. Michael',
            'St. George',
            'St. John',
            'Christ Church',
            'St. Philip',
            'All Parishes'
        ],
        required:[true, 'Please select a parish of operations']
    }],
    services:[{ type: Array, required: [true, 'Please select a service']}],
    completedJobs: { type: Number, default: 0},
    totalRatings: { type: Number, default: 0}, //devided by total number of submitted ratings   
    avgRating: { type: Number, default: undefined },
},
 {timestamps: true}
);

module.exports.Contractors = mongoose.model('Contractors', contractorSchema);
