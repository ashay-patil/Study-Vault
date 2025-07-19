const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service :'gmail',
    auth : {
        user : process.env.EMAIL_OWNER,
        pass : process.env.EMAIL_PASS
    }
});

const sendOTP = async (to,otp)=>{
    await transporter.sendMail({
        to,
        subject : 'Your OTP Code',
        text :`Your OTP is ${otp}`
    });
}

module.exports = sendOTP;