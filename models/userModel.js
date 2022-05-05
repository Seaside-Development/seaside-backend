const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    username: { type: String, required: true, unique: true },
    email: {type: String, required: true},
    avatar: {type: String },
    password: { type: String, required: true},
    telephone: { type: String, required: false}

});

module.exports.customer = mongoose.model('customer', customerSchema);