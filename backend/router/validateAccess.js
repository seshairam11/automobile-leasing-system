const express = require('express');
const router = express.Router();
const { signupController } = require('../controllers/SignupController');
const { loginController } = require('../controllers/loginController');
const { UpdateUserDetails } = require('../controllers/UpdateUserDetails');
const { viewDrivers } = require('../controllers/viewDriver');
const { addDriver } = require('../controllers/adddrivers');
const { deleteDriver } = require('../controllers/deleteDriver');
const { viewLocation, createLocation, deleteLocation, viewAllLocation } = require('../controllers/crad_location');
const { viewRequestTracking, deleteRequestTracking, viewStatusTracking } = require('../controllers/trackVehicle');
const { sendingEmailController, ListDeviceController } = require('../controllers/sendingEmailID');

console.log("test")
router.route('/signup').post(signupController);
router.route('/signin').post(loginController);
router.route('/updateuserdetails').post(UpdateUserDetails);
router.route('/viewdrivers').post(viewDrivers);
router.route('/adddriver').post(addDriver);
router.route('/deletedriver').post(deleteDriver);
router.route('/listlocation').post(viewLocation);
router.route('/createlocation').post(createLocation);
router.route('/deletelocation').post(deleteLocation);
router.route('/alllocation').post(viewAllLocation);
router.route('/listrequesttracking').post(viewRequestTracking);
router.route('/deleterequesttracking').post(deleteRequestTracking);
router.route('/liststatustracking').post(viewStatusTracking);
router.route('/sendemail').post(sendingEmailController);
router.route('/listingdevice').post(ListDeviceController);

module.exports = router;