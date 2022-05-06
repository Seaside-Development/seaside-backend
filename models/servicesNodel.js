
//WE MAY NOT NEED THIS SCHEMA FURTHER RESEARCH NEEDD TO COME TO FINAL CONCLUSION


const mongoose = require('mongoose');

const servicesSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    services:[{
        Plumbing: [{type: Array, enum:['installation', 'removal', 'repairs']}],
        Gardening: [{type: Array, enum:['lawn maintainence', 'planting']}],
        Construction: [{type: Array, enum:['masonry', 'design', 'construction', 'roofing', 'Land Surveor', 'painting and decorating', 'carpentry', 'insulation', 'tiling', 'glazier'] }],
        Electrical: [{ type: Array, enum:['installtion','repairs']}]
    }]
    
    
});


module.exports.services = mongoose.model('services', servicesSchema);