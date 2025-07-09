const mongoose = require('mongoose');

const IotDeviceSchema = new mongoose.Schema({
    providerid: { type: String, required: false },
    emailID: { type: String, required: false },
    deviceName: { type: String, required: false },
    vehicleName: { type: String, required: false },
    vehicleNo: { type: String, required: false },
    addressOnBooking: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
}, {
    collection: 'IotDevice'
});

const IotDeviceModel = mongoose.model('IotDevice', IotDeviceSchema);
module.exports = IotDeviceModel;