const mongoose = require('mongoose');

const mapCoordsSchema = new mongoose.Schema({
    droplocationCords: { type: Object, required: false },
    pickupCords: { type: Object, required: false },
    referId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },

}, {
    collection: 'AccessMapCoords'
});

const AccessMapCoordsModel = mongoose.model('AccessMapCoords', mapCoordsSchema);
module.exports = AccessMapCoordsModel;
