const mongoose = require('mongoose');

const contractorSchema = mongoose.Schema({
    // must have a user reference, is an array because contractors can have multiple users
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    contractorName: {type: String, required: [true, 'Please provide a name']},
    //i.e. company name
    title: {type: String},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        //match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        required: [true, "Please provide an email"], 
    },
    telephone: {type: String, required: [true, 'Please provide a telephone number']},
    businessDescription: { type: String, required: true, default: '' },                         
    operatingLocations: [{
        type: Array,
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
    //array of industries that the contractor works in
    industry: [{type: Array}],
    //array of services that the contractor offers
    // must have a services reference, is an array because contractors can have multiple services
    services:[{ type: Array, required: [true, 'Please select a service']}],
    completedJobs: { type: Number, default: 0},
    totalRatings: { type: Number, default: 0}, //devided by total number of submitted ratings   
    avgRating: { type: Number, default: undefined },
},
 {timestamps: true}
);

module.exports = mongoose.model('Contractors', contractorSchema);
