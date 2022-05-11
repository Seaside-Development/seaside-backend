const mongoose = require('mongoose');
const  services = require('./servicesModel');
const User = require('./usersModel');

const contractorSchema = mongoose.Schema({
    // must have a user reference, is an array because contractors can have multiple users
    userId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}],
    contractorName: { type: String, required: [true, 'Please provide a name']},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        required: [true, "Please provide an email"], 
    },
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
            'St. Philip'
        ],
        required:[true, 'Please select a parish of operations']
    }],
    services:[{ type: mongoose.Schema.Types.Array, required: true, ref: services }],
    ratings: {required: false, default: 0, type: Number},
},
 {timestamps: true}
);

const ratings=new mongoose.Schema({
    ContractorRating: {type: mongoose.Schema.Types.Mixed, ref: 'Review'},
    completedJobs: { type: Number, required: false, default: 0 },
    avgRating: { type: Number, default: undefined, required:true },
})

module.exports.Contractors = mongoose.model('Contractors', contractorSchema);
