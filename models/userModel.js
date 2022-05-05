const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    _id: { type: String, required: true, unique: true},
    username: { type: String, required: [true, "Please provide a username"], unique: true },
    email: {type: String, required: [true, "Please provide an email"], unique: true},
    avatar: {type: String },
    password: { type: String, required: [true, "Please enter a password"]},
    telephone: { type: String, required: false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;