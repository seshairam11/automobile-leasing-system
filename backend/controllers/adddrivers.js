const AccessUserDetailsModel = require('../modules/userDetailsModule')
const AccessMapCoordsModel = require('../modules/mapCoordsModule')

exports.addDriver = async (req, res, next) => {
    const requestData = req.body;
    try {
        const validateEmail = await AccessUserDetailsModel.findOne({ mailID: requestData.mailID });
        if (validateEmail === null) {
            const validatePhoneno = await AccessUserDetailsModel.findOne({ phone: requestData.phone });
            if (validatePhoneno === null) {
                const newDriver = await AccessUserDetailsModel.insertMany(requestData);
                const driverCoords = await AccessMapCoordsModel.insertOne({ referId: newDriver[0]._id });
                res.json({
                    isAuth: true,
                    errormsg: "login validate successfully",
                    value: newDriver
                });
            } else {
                res.json({
                    isAuth: false,
                    errormsg: "phoneno already registered",
                });
            }
        } else {
            res.json({
                isAuth: false,
                errormsg: "EmailID already registered",
            });
        }
    } catch (err) {
        console.dir(err)
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}