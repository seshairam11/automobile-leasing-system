const AccessUserDetailsModel = require('../modules/userDetailsModule')
exports.UpdateUserDetails = async (req, res, next) => {
    const updateUser = req.body;

    try {
        const updateDetails = await AccessUserDetailsModel.updateMany(
            { _id: updateUser._id },
            {
                $set: {
                    userName: updateUser.userName,
                    mailID: updateUser.mailID,
                    phone: updateUser.phone,
                    password: updateUser.password
                }
            });
        console.log(updateDetails)
        res.json({
            isAuth: true,
            errormsg: "login validate successfully",
            value: updateUser
        });
    } catch (err) {
        console.log(err)
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}