const AccessUserDetailsModel = require('../modules/userDetailsModule')

exports.deleteDriver = async (req, res, next) => {
    const requestData = req.body;
    try {
        const employeeDelete = await AccessUserDetailsModel.deleteOne({ _id: requestData._id });
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