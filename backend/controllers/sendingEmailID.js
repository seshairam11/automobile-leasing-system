const nodemailer = require('nodemailer');
const IotDeviceModel = require('../modules/iotDeviceModule')

exports.sendingEmailController = async (req, res, next) => {
    const request = req.body
    const subject = `Order Request for Tracking Device – Provider ID: ${request.providerid}`;
    const body = `Hello Team,

We hope you're doing well.

One of our providers has requested a tracking device. Below are the details for processing the order:

Provider ID : ${request.providerid}
Device Name : ${request.deviceName}
Vehicle Name : ${request.vehicleName}
Vehicle Number : ${request.vehicleNo}
Booking Address :
${request.addressOnBooking}
  
We appreciate your continued efforts in ensuring our providers are satisfied.  
Please proceed with the device delivery at your earliest convenience


Thank you for your support.
Best regards, 
K.Lokesh
CEO
Automobile Leasing System
automobileleasingsystem@gmail.com
`
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'automobileleasingsystem@gmail.com',
                pass: 'uajl rcig jbvv xiga',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        await transporter.sendMail({
            from: '"Automobile App Support" <automobileleasingsystem@gmail.com>',
            to: 'automobileleasingsystemofficia@gmail.com',
            replyTo: request.emailID,
            subject: subject,
            text: body,
        });
        const newData = new IotDeviceModel(request);
        await newData.save();
        res.status(200).send({ isAuth: true, message: 'Email sent successfully' });
        console.log("email sended sucessfully")
    } catch (error) {
        console.log(error);
        res.status(500).send({ isAuth: false, message: 'Email sending failed' });
    }
}

exports.ListDeviceController = async (req, res, next) => {
    const _id = req.body._id;
    try {
        const requestDeviceLst = await IotDeviceModel.find({ providerid: _id });
        console.log(requestDeviceLst)
        res.json({
            isAuth: true,
            errormsg: "Device Listed Successfully",
            value: requestDeviceLst
        });
    } catch (error) {
        console.log(error)
         res.json({
            isAuth: false,
            errormsg: "Error",
            value:error
        });
    }
}