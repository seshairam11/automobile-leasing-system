const ListRequestModel = require('../modules/listRequestModule')

exports.TrackVehicle = async (Socket, io) => {
    Socket.on('requesttracking', async (data) => {
        try {
            const findTracking = await ListRequestModel.find(data)
            if (findTracking.length === 0) {
                const createTracking = await ListRequestModel.insertOne(data)
                const id = `${createTracking.receiver}_request`
                console.log(id)
                io.emit(id, (createTracking));
            }
        } catch (error) {
            console.log(error);
        }
    })
    Socket.on('responsetracking', async (_id, lat, long, activeSts) => {
        try {
            const updatedResponseTracking = await ListRequestModel.findOneAndUpdate(
                { _id: _id },             // Filter
                { $set: { lat, long, activeSts } }, // Update
                { new: true }
            )
            console.log(updatedResponseTracking)
            const Renter = `${updatedResponseTracking.receiver}_response`
            io.emit(Renter, (updatedResponseTracking));
        } catch (error) {
            console.log(error);
        }
    })
}
exports.viewRequestTracking = async (req, res, next) => {
    const requestData = req.body;
    try {
        console.log(requestData._id)
        const locationList = await ListRequestModel.find({ receiver: requestData._id });
        console.log(locationList)
        res.json({
            isAuth: true,
            errormsg: "Listed successfully",
            value: locationList,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}
exports.viewStatusTracking = async (req, res, next) => {
    const requestData = req.body;
    try {
        console.log(requestData._id)
        const locationList = await ListRequestModel.find({ sender: requestData._id });
        console.log(locationList)
        res.json({
            isAuth: true,
            errormsg: "Listed successfully",
            value: locationList,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}
exports.deleteRequestTracking = async (req, res, next) => {
    const requestData = req.body;
    console.log(requestData)
    try {
        const requestTrackingDelete = await ListRequestModel.deleteOne({ _id: requestData._id });
        console.log(requestTrackingDelete)
        res.json({
            isAuth: true,
            errormsg: "Deleted successfully",
            value: requestData._id
        });
    } catch (err) {
        console.log(err)
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}