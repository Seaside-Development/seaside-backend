const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, index: true }, // _id is required and unique
    username: { type: String, required: [true, "Please provide a username"], unique: true },
    email: {type: String, required: [true, "Please provide an email"], unique: true},
    avatar: {type: String },
    password: { type: String, required: [true, "Please enter a password"]},
    telephone: { type: String, required: false},
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);