const express = require('express');
const router = express.Router();
const {register, verifyOTP, resendOTP, login} = require('../controllers/user');
const {
  registerCredentialMiddleware,
  loginCredentialMiddleware,
  resendOTPCredentialMiddleware,
  verifyOTPCredentialMiddleware
} = require('../middlewares/user-credentials');

router.post('/register', registerCredentialMiddleware, register);
router.post('/verify-otp', verifyOTPCredentialMiddleware, verifyOTP);
router.post('/resend-otp', resendOTPCredentialMiddleware, resendOTP);
router.post('/login', loginCredentialMiddleware, login);


module.exports = router;
