const ListRequestModel = require("../modules/listRequestModule");
const LocationModel = require("../modules/LocationModule")
exports.createLocation = async (req, res, next) => {
    const requestData = req.body;
    try {
        const findLocation = await LocationModel.find({ lat: requestData.lat, long: requestData.long });
        if (findLocation.length == 0) {
            const createLocation = await LocationModel.insertMany(requestData);
            console.log(createLocation)
            res.json({
                isAuth: true,
                errormsg: "Data insert Successfully",
                value: createLocation
            });
        }
    } catch (err) {
        console.log(err)
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }

}
exports.viewLocation = async (req, res, next) => {
    const requestData = req.body;
    try {
        console.log(requestData.referId)
        const locationList = await LocationModel.find({ referId: requestData.referId });
        const findRenter = await ListRequestModel.find({ sender: requestData.referId, activeSts: true })
        console.log(findRenter)
        res.json({
            isAuth: true,
            errormsg: "Listed successfully",
            value: locationList,
            renters: findRenter
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}
exports.viewAllLocation = async (req, res, next) => {
    const requestData = req.body;
    try {
        const locationList = await LocationModel.find();
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
exports.deleteLocation = async (req, res, next) => {
    const requestData = req.body;
    try {
        const employeeDelete = await LocationModel.deleteOne({ _id: requestData._id });
        console.log(employeeDelete)
        res.json({
            isAuth: true,
            errormsg: "Deleted successfully",
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}