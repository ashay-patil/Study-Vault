const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type:String,
        required : true,
        unique:true
    },
    password :{
        type : String,
        required : true,
    },
    otp : String,
    otpExpiresAt : Date,
    isVerified : {
        type: Boolean,
        default : false
    },
});

module.exports = mongoose.model('user', userSchema);