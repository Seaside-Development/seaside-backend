const mongoose = require('mongoose');

const jobRequestsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    contractor: { type: String, required: true },
    businessDescription: { type: string, required: true, default: '' },
    operatingLocations: {}, 
    ratings: [
        {
            completedJobs: { type: Number, required: true, default: 0 },
            avgRating: { type: Number, default: 0, required:true },
        }
    ],
    activeJobs: {type: mongoose.Schema.ObjectId},

});

module.exports = mongoose.model('JobRequests', jobRequestsSchema);