const AccessUserDetailsModel = require('../modules/userDetailsModule')

exports.viewDrivers = async (req, res, next) => {
    const requestData = req.body;
    try {
        const DriversList = await AccessUserDetailsModel.find({ referId: requestData.referId });
        res.json({
            isAuth: true,
            errormsg: "Listed successfully",
            value: DriversList,
        });
    } catch (err) {
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}