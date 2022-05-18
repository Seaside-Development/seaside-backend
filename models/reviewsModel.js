const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        rating: {type: Number, min:0, max:5, required: [true, 'Please select a rating']},
        details: {type: String, default: '', required: [true, 'Please enter a review']},
        Date: {type: Date, default: Date.now},
        // Reference to the user who created the review and job that was reviewed
        jobId: {type: mongoose.Schema.Types.ObjectId, ref: 'JobRequests'},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Review', reviewSchema);