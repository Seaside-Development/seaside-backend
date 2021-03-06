const mongoose = require('mongoose');
const contractor=require('./contractorModel').contractors
const User=require('./userModel').user

//Job request Schema
const jobRequestsSchema = mongoose.Schema({
    title: { type: String, required: [true, "Please provide a title"] },
    complexity: {type: String, default: "Easy", required: [true, 'Please select a complexity']}, //description: 'true means complex, false means simple. MANDATORY'
    //reference to contractor
    contractorID: {type: mongoose.Schema.Types.ObjectId, ref: 'Contractors'},
    //reference to user
    user: 
      {
        type: mongoose.Schema.Types.ObjectId, 
        // required: true,
        ref: 'User',
      },
    
    //Industry that pertains to the job
    industry: {
      type:String,
      enum: ['Gardening', 'Construction', 'Plumbing','Electrical', 'Cleaning', "Lawn", "Mechanic", 'Other', 'None'],
      required:  [true, 'Please select an industry']
    },
    service: {
      type: String,
    },
    //job description
    description: {type:String, default: '', required: [true, 'Please enter a job description']},
    //How long the job is expected to be
    length: {type: String, default: false, required: [true, 'Please select a true or false']}, //description: 'true means long, false means short. MANDATORY'
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
        //required: [true, 'Please select a status'],
        default: 'Pending'
    },
    //Start and end dates of job
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    img: {
      data: Buffer, contentType: String
    },
    //Customer review of job
    review:[{ 
          rating: {type: Number, min:0, max:5, required: [true, 'Please select a rating']},
          details: {type: String, default: '', required: [true, 'Please enter a review']},
          Date: {type: Date, default: Date.now}
    }]   
 }, 
  {timestamps: true}
 );


module.exports = mongoose.model('JobRequests', jobRequestsSchema);