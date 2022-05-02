const mongoose = require('mongoose');

const jobRequestsSchema = mongoose.Schema({
   _id: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true}, // _id is required and unique
   complexity: {type: Boolean, default: false, required: [true, 'Please select a complexity']}, //description: 'true means complex, false means simple. MANDATORY'
   contractor: {type: String, default: '', required:true}, //description: 'MANDATORY'
   contractorID: [{type: mongoose.Schema.Types.ObjectId, ref: 'contractors'}],
   customerID: [{type: mongoose.Schema.Types.ObjectId, ref: 'customers'}],
   industry: {
     type:String,
     enum: ['Gardening', 'Construction', 'Plumbing','Electrical'],
     required:  [true, 'Please select an industry']
   },
   job_description: {type:String, default: ''},
   length: {type: Boolean, default: false, required: [true, 'Please select a true or false']}, //description: 'true means long, false means short. MANDATORY'
   parish: {
     type: String,
     enum: ['St. Lucy','St. Peter','St. James','St. Andrew','St. Thomas', 'St. Joseph','St. Michael', 'St. George','St. John','Christ Church','St. Philip' ],
     required: [true, 'Please select a parish']
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      required: [true, 'Please select a status']
    },
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    review: {type: Object, default: {
      rating: {min:0, max:5},
      details: {type: String, default: ''}
    }}
 });

module.exports = mongoose.model('JobRequests', jobRequestsSchema);