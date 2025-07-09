const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    mailID: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    referId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'AccessUserDetails'
});

const AccessUserDetailsModel = mongoose.model('AccessUserDetails', userDetailsSchema);
module.exports = AccessUserDetailsModel;
