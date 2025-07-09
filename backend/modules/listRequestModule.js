const mongoose = require('mongoose');

const ListRequestSchema = new mongoose.Schema({
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
    vehicleName: { type: String, required: false },
    provider: { type: String, required: false },
    vehicleNo: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    activeSts: { type: Boolean, required: false }
}, {
    collection: 'ListRequest'
});

const ListRequestModel = mongoose.model('ListRequest', ListRequestSchema);
module.exports = ListRequestModel;