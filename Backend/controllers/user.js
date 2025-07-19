const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTP = require('../services/otpService');
const {StatusCodes} = require('http-status-codes');
const generateOTP = require('../utils/generateOTP');

const register = async (req, res)=>{
    const {email, password} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(StatusCodes.CONFLICT).json({success : false ,msg:'User exists already'});
    }
    const hashpass = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5*60*1000);
    await sendOTP(email, otp);
    const user = await User.create({
        email,
        password : hashpass,
        otp,
        otpExpiresAt
    });
    res.status(StatusCodes.CREATED).json({success : true, msg : `OTP sent to ${email}`});
}

const verifyOTP = async (req, res)=>{
    const {email, otp} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status().json({success : false, msg : 'User not found'});
    }
    const now = new Date();
    if(!user.otpExpiresAt || user.otpExpiresAt < now){
        return res.status(StatusCodes.GONE).json({success : false, msg : 'OTP is Expires'});
    }
    if(user.otp!==otp){
        return res.status(StatusCodes.UNAUTHORIZED).json({success:false, msg:'Invalid OTP'});
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
    res.status(StatusCodes.OK).json({success : true, msg:'Email Verified Successfully'});
}


const resendOTP = async (req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(StatusCodes.NOT_FOUND).json({success : false, msg : 'User not found'});
    }
    if(user.isVerified){
        return res.status(StatusCodes.BAD_REQUEST).json({success : false, msg :'Email already verified'});
    }
    const newOTP = generateOTP();
    const newExpiry = new Date(Date.now()+5*60*1000);
    user.otp = newOTP;
    user.otpExpiresAt = newExpiry;
    await sendOTP(email, newOTP);
    await user.save();
    res.status(StatusCodes.OK).json({success : true, msg :`New OTP sent to ${email}`});
}

const login = async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status().json({success:false, msg : 'User not registered'});
    }
    if(!user.isVerified){
        return res.status(StatusCodes.UNAUTHORIZED).json({success : false, msg : 'Email not verified'});
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(StatusCodes.UNAUTHORIZED).json({success : false, msg:'Incorrect passoword'});
    }
    const token = jwt.sign({id:user._id, email}, process.env.JWT_SECRET,{expiresIn:'1d'});
    res.status(StatusCodes.OK).json({success : true, token});
}

module.exports = {register, verifyOTP, resendOTP, login};