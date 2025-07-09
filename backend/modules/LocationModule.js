const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    referId: { type: String, required: false },
    locationName: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },

}, {
    collection: 'Location'
});

const LocationModel = mongoose.model('Location', LocationSchema);
module.exports = LocationModel;