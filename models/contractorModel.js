const mongoose = require('mongoose');

const jobRequestsSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    contractor: { type: String, required: true },
    businessDescription: { type: string, required: true, default: '' },
    operatungLocations: {},

    activeJobs: {},

});

module.exports = mongoose.model('JobRequests', jobRequestsSchema);