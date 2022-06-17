const asyncHandler = require('express-async-handler');
const { result } = require('lodash');
const JobRequests = require('../models/jobRequestsModel');
const Contractors = require('../models/contractorModel');
const reviews = require('../models/reviewsModel');

// @desc    Get all Jobs
// @route   GET /job-list
// @access  Public
const searchJobrequests = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const perPage = 10;
        const page = req.params.page || 1;
        const jobrequests = await JobRequests
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec( function (err, jobrequests) {
                JobRequests.countDocuments().exec(function (err, count) {
                    if (err) return next(err)
                    res.render('job-list', {
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

// @desc    Set Service
// @route   POST /api/services
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
        res.redirect("/jobrequests/findcontractors?industry="+industry+"&service="+service+"&_id="+jobrequest._id, {industry: req.query.industry, service: req.query.service}, 201);
        console.log({industry, service}, 'query information');
    }

    else
        res.redirect(401,'/')

})

// @desc    Get a contractor by search query
// @route   GET /contractorpreview
// @access  Public
const findContractors = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        let {industry, services} = req.query;

        //search for the contractor by query parameters
        let contractors = await Contractors.find(
        {
            industry: [industry],
            service: [services],
        })
        
        console.log(contractors, 'contractors');
        // limit the results to 5
        contractors = contractors.slice(0, 5);

        res.render('contractorpreview', {contractors});
        //res.status(200).json(contractors);
    }

    else
        res.redirect('/')

})

const addContractor = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        // get the review and change the status to completed
        let {id} = req.query;
        let contractorID = req.body;

        const jobrequest = await JobRequests.findById(id);
        console.log(jobrequest, 'jobrequest');
        
        //update the service
        const updatedJobrequest = await JobRequests.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updatedJobrequest);
    }

    else
        res.redirect('/')

})

// @desc    Update Service
// @route   PUT /api/services/update/:id
// @access  Private
const updateJobrequest = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const jobrequest = await JobRequests.findByIdAndUpdate(req.params.id)
        if(!jobrequest) {
            res.status(404)
            throw new Error('Jobrequest not found');
        }

        // Check for user
        if (!req.user) {
            res.status(401)
            throw new Error('User not found')
        }

        // Make sure the logged in user matches the goal user
        if (jobrequest.user.toString() !== req.user.id) {
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
        res.redirect('/')

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
        res.redirect('/')

})

// @desc    Delete Service
// @route   DELETE /api/services/remove/:id
// @access  Private
const deleteJobrequest = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        //check if the jobrequest exists
        const jobrequest = await JobRequests.findById(req.params.id);
        if(!jobrequest) {
            res.status(404)
            throw new Error('Jobrequest not found');
        }
        // Check for user
        if (!req.user) {
            res.status(401)
            throw new Error('User not found')
        }

        // Make sure the logged in user matches the jobrequest user
        if (jobrequest.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('User not authorized to delete this request')
        }
        await jobrequest.remove();

        res.status(200).json({message: `Delete Job Requests ${req.params.id}`});

    }

    else
        res.redirect('/')
    
})

const getJobrequestById = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const email = req.params.email;
        await JobRequests.findById(email)
            .then(result => {
            res.render('jobDetails', { jobrequest: result, title: 'Job Request Details by ID' });
        })
        .catch(err => {
            res.status(404)
            throw new Error('Jobrequest not found');
        })

    }
    else
        res.redirect('/')

});

const getJobrequestByContractorId = asyncHandler (async (req, res) => {
    if (req.cookies.auth){
        const jobrequest = await JobRequests.find({contractorID: req.params.id});
        if(!jobrequest) {
            res.status(404)
            throw new Error('Jobrequest not found');
        }
        res.status(200).json(jobrequest);

    }
    else
        res.redirect('/')
})

module.exports = {
    searchJobrequests, setJobrequest, updateJobrequest, deleteJobrequest, getJobrequestById, addReview, getJobrequestByContractorId, findContractors, addContractor
}