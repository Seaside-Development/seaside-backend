const asyncHandler = require('express-async-handler');
const { result } = require('lodash');
const JobRequests = require('../models/jobRequestsModel');
const Contractors = require('../models/contractorModel');
const reviews = require('../models/reviewsModel');
const moment = require('moment');
  
// @desc    Get all Jobs
// @route   GET /job-list
// @access  Public
const searchJobrequests = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const user = req.cookies.auth;
        const contractorID = req.cookies.auth;
        const perPage = 10;
        const page = req.params.page || 1;
        JobRequests
            .find({
                $or: [{user: [user]}, {contractorID: [contractorID]}]
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec( function (err, jobrequests) {
                JobRequests.countDocuments().exec(function (err, count) {
                    if (err) return next(err)
                    res.render('job-list', {
                        moment: moment,
                        jobrequests,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            }
        );

    }
    
    else{
        res.redirect(401,'/')
    }
});


// @desc    Get a job by id
// @route   GET /jobrequest/findJobrequestById/:id
// @access  Public
const findJobrequestById = asyncHandler (async (req, res) => {

    if (req.cookies.auth){
        const id = req.cookies.auth
        const findUser = await Contractors.findById(id);
  
        if(findUser) {
        AContractor = true;
        }
        else {
            AContractor = false;
        }
        console.log("are they a contractor:", AContractor)
        const jobrequest = await JobRequests.findById(req.params.id);
        res.render('jobDetails', { AContractor, jobrequest: jobrequest });
        return AContractor
    }
    else{
        res.redirect(401,'/')
    }
}
);

// @desc    Get a job by id
const UpdatePage = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const jobrequest = await JobRequests.findById(req.params.id);
        let contractorId = jobrequest.contractorID;
        const contractor = await Contractors.findById(contractorId);
        // console.log("contractor:", contractor.contractorName)
        res.render('jobupdateform', { jobrequest: jobrequest, contractor: contractor });
    }
    else{
        res.redirect(401,'/')
    }}
);

// @desc    Set Service
// @route   POST /services
// @access  Private
const setJobrequest = asyncHandler (async (req, res) => {

    if (req.cookies.auth){
        const {title, complexity, contractorID, user, industry, service, description, length, parish, status, startdate, endDate, reviews, img} = req.body;

        if(!title || !complexity || !industry || !description || !service || !length || !parish || !startdate) {
            res.status(400)
            return (`Please add required fields`);
        }
        const jobrequest = await JobRequests.create({
            title, 
            complexity, 
            contractorID, 
            industry, 
            service,
            description, 
            length, 
            parish, 
            status: 'Pending', 
            startdate, 
            endDate, 
            reviews,
            user: req.cookies.auth
        });
        console.log(jobrequest, );
        res.redirect("/jobrequests/findcontractors?industry="+industry+"&id="+jobrequest._id+"&service="+service, 
        {
            industry: req.query.industry, 
            id: req.query._id,
            service: req.query.service, 
        }, 
            201);
        console.log({industry, service, id}, 'query information');
    }

    else
        res.redirect('/401')

})

// @desc    Get a contractor by search query
// @route   GET /contractorpreview
// @access  Public
const findContractors = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        let {industry, services, id} = req.query;
        console.log(industry, services, id, 'query information');

        //search for the contractor by query parameters
        let contractors = await Contractors.find(
        {
            industry: [industry],
            service: [services],
        })
        const jobrequest = await JobRequests.findById(id);

        //console.log(`JOB REQUEST: ${jobrequest}`.red, `CONTRACTORS: ${contractors}`.green);
        // limit the results to 5
        contractors = contractors.slice(0, 5);
        // render the page
        res.render('contractorpreview', {contractors, jobrequest});
    }

    else
        res.redirect('/401')

})

const addContractor = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        // get the review and change the status to completed
        let {jobid, contractorid} = req.params;

        //console.log('CONTRACTORID:', contractorid, 'JOBID:', jobid, "JUST A CHECK")

        const jobrequest = await JobRequests.findById(jobid);
        //console.log(jobrequest, "JOB REQUEST")
        const contractor = await Contractors.findById(contractorid);

        //update the service
        const updatedJobrequest = await JobRequests.findByIdAndUpdate(jobid, {
            contractorID: contractorid,
            new: true,
        });
        console.log('UPDATED JOB:', updatedJobrequest);
    }
    else
        res.redirect('/401')

})

// @desc    Allow a contractor to change the status of a job
// @route   GET /contractorpreview
// @access  Public
const UpdateStatus = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        // get the review and change the status to completed
        let {status, id} = req.params;
        console.log(id, status, 'STATUS')

        const jobrequest = await JobRequests.findById(id);
      
        if (status = 'Pending'){
            //console.log('COMPLETED')
            const updatedJobrequest = await JobRequests.findByIdAndUpdate(id, {
                jobrequest: jobrequest.contractorID = null,
                status: status,
                new: true,
            });
        }
        else{
            //console.log('PENDING')
            const updatedJobrequest = await JobRequests.findByIdAndUpdate(id, {
                status: status,
                new: true,
            });
        }
    }
    else
        res.redirect('/401')

})

// @desc    Update Service
// @route   PUT /api/services/update/:id
// @access  Private
const updateJobrequest = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        let id = req.query.id
        console.log(req.params)
        
        const jobrequest = await JobRequests.findById(id)
        console.log(jobrequest)
        if(!jobrequest) {
            console.log("dead wrong")
            res.status(404)
            throw new Error('Jobrequest not found');
        }

        res.status(200).json(jobrequest);

        // Make sure the logged in user matches the goal user
        if (jobrequest.user.toString() !== req.cookies.auth) {
            res.status(401)
            throw new Error('User not authorized to update this request')
        }

        //update the goal or create a new one
        const updatedJobrequest = await JobRequests.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        
        res.status(200).json(updatedJobrequest);

    }
    else
        res.redirect('/401')

})


// @desc    Add Service review
// @route   PUT /api/services/review/:id
// @access  Private
const addReview = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        // get the review and change the status to completed
        const {reviews, status = 'Completed'} = req.body;
        
        // check if the job exist
        const jobrequest = await JobRequests.findByIdAndUpdate(req.params.id) 
        if(!jobrequest) {
            res.status(400)
            throw new Error('Job not found');
        }
        // check if the review is empty
        if(!reviews || !status) {
            res.status(400)
            throw new Error('Please add required fields');
        }

        // Checkl if the user is found
        if (!req.user) {
            res.status(401)
            throw new Error('User not found')
        }

        // check if user is the same as the user who created the service
        if (jobrequest.user.toString() !== req.user._id.toString()) {
            res.status(401)
            throw new Error('User not authorized to add review')
        }

        // add the review to the contractor model
            

        //update the service
        const updatedJobrequest = await JobRequests.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedJobrequest);

    }

    else
        res.redirect('/401')

})

// @desc    Delete Service
// @route   DELETE /api/services/remove/:id
// @access  Private
const deleteJobrequest = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const user = req.cookies.auth
        const id = req.params.id

        //check if the jobrequest exists
        const jobrequest = await JobRequests.findById(id);
        if(!jobrequest) {
            res.status(404)
            throw new Error('Jobrequest not found');
        }
        // // Check for user
        // if (!req.user) {
        //     res.status(401)
        //     throw new Error('User not found')
        // }

        // Make sure the logged in user matches the jobrequest user
        if (jobrequest.user.toString() !== req.cookies.auth) {
            res.status(401)
            throw new Error('User not authorized to delete this request')
        }
        await jobrequest.remove()
        .then(result => {
            res.json({ redirect: '/jobrequests/searchJobs/1' });
        })
        // res.status(200).json({message: `Delete Job Requests ${req.params.id}`});
    }
    else
        res.redirect('/')
})

module.exports = {
    searchJobrequests, 
    setJobrequest, 
    updateJobrequest, 
    deleteJobrequest, 
    addReview, 
    findContractors, 
    addContractor,
    findJobrequestById,
    UpdateStatus,
    UpdatePage,
}