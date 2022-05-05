const mongoose = require('mongoose');

const ContractorSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    contractor: { type: String, required: true },
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
        ]

    }], 
    ratings: [
        {
            completedJobs: { type: Number, required: true, default: 0 },
            avgRating: { type: Number, default: 0, required:true },
        }
    ],
    activeJobs: {type: mongoose.Schema.ObjectId},

});

module.exports = mongoose.model('Contractor', ContractorSchema);