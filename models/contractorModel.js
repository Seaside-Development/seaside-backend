const mongoose = require('mongoose');
const  services = require('./servicesNodel').services;


const contractorSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    contractorName: { type: String, required: true },
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
        ],
        required:[true, 'Please select a parish of operations']
    

    }],
    
    services:[{ type: mongoose.Schema.Types.ObjectId, required: true, ref: services }],
    ratings: {required: false, default: 0, type: Number},
});


const ratings=new mongoose.Schema({
    completedJobs: { type: Number, required: true, default: 0 },
    avgRating: { type: Number, default: undefined, required:true },
})


//THIS IS ACTING AS A POTENTIAL SUBSCHEMA AND MAY NOT BE NEEDED WITH IMPLEMNTATION
const servicesSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    
    services:[{
        Plumbing: [{type: Array, enum:['installation', 'removal', 'repairs']}],
        Gardening: [{type: Array, enum:['lawn maintainence', 'planting']}],
        Construction: [{type: Array, enum:['masonry', 'design', 'construction', 'roofing', 'Land Surveor', 'painting and decorating', 'carpentry', 'insulation', 'tiling', 'glazier'] }],
        Electrical: [{ type: Array, enum:['installtion','repairs']}]
    }]
    
    
});



module.exports.contractors = mongoose.model('contractors', contractorSchema);
