const mongoose = require('mongoose');


//Job request Schema
const jobRequestsSchema = mongoose.Schema({
   _id: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true}, // _id is required and unique
   complexity: {type: Boolean, default: false, required: [true, 'Please select a complexity']}, //description: 'true means complex, false means simple. MANDATORY'
   contractorID: [{type: mongoose.Schema.Types.ObjectId, ref: 'contractors'}],
   customerID: [{type: mongoose.Schema.Types.ObjectId, ref: 'customers'}],
   
   //Industry that pertains to the job
   industry: {
     type:String,
     enum: ['Gardening', 'Construction', 'Plumbing','Electrical'],
     required:  [true, 'Please select an industry']
   },

   //job description
   job_description: {type:String, default: ''},
   
   //How long the job is expected to be
   length: {type: Boolean, default: false, required: [true, 'Please select a true or false']}, //description: 'true means long, false means short. MANDATORY'
   
   //Location of Job
   parish: {
     type: String,
     enum: ['St. Lucy','St. Peter','St. James','St. Andrew','St. Thomas', 'St. Joseph','St. Michael', 'St. George','St. John','Christ Church','St. Philip' ],
     unique: true,
     required: [true, 'Please select a parish']
    },

    //Current Status of Job
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      required: [true, 'Please select a status']
    },

    //Start and end dates of job
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    
    //Customer review of job
    review:{ 
        rating: {type: Number, min:0, max:5, required: [true, 'Please select a rating']},
        details: {type: String, default: '', required: [true, 'Please enter a review']},
        Date: {type: Date, default: Date.now}
    }
     
 });

module.exports = mongoose.model('JobRequests', jobRequestsSchema);