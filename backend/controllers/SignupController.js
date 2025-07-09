const accessUserDetailsModel = require('../modules/userDetailsModule')

exports.signupController = async (req, res, next) => {
    const createUser = req.body;
    try {
        const validateEmail = await accessUserDetailsModel.findOne({ mailID: createUser.mailID });
        if (validateEmail === null) {
            const validatePhoneno = await accessUserDetailsModel.findOne({ phone: createUser.phone });
            if (validatePhoneno === null) {
                const newUser = new accessUserDetailsModel(createUser);
                await newUser.save();
                console.log(newUser);
                res.json({
                    isAuth: true,
                    errormsg: "login validate successfully",
                    value: newUser
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
        res.json({
            isAuth: false,
            errormsg: err.errorResponse,
        });
    }
}