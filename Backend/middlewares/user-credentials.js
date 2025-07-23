const { InvalidCredentials } = require("../errors");
const { register, login, resendOTP, verifyOTP } = require("../validators/user")


const registerCredentialMiddleware = (req, res, next)=>{
    const {error} = register(req.body);
    if(error){
        throw new InvalidCredentials(error.details[0].message);
    }
    next();
}

const loginCredentialMiddleware = (req, res, next)=>{
    const {error} = login(req.body);
    if(error){
        throw new InvalidCredentials(error.details[0].message);
    }
    next();
}

const resendOTPCredentialMiddleware = (req, res, next)=>{
    console.log("Reached resendOTPCredentialMiddleware");
    const {error} = resendOTP(req.body);
    if(error){
        throw new InvalidCredentials(error.details[0].message);
    }
    next();
}

const verifyOTPCredentialMiddleware = (req, res, next)=>{
    console.log("Reached verifyOTPCredentialMiddleware");
    const {error} = verifyOTP(req.body);
    console.log("Reached verifyOTPCredentialMiddleware 2");
    if(error){
        console.log(error.details[0].message);
        throw new InvalidCredentials(error.details[0].message);
    }
    next();
}

module.exports = {
    registerCredentialMiddleware,
    loginCredentialMiddleware,
    resendOTPCredentialMiddleware,
    verifyOTPCredentialMiddleware
};