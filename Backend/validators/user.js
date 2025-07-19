const Joi = require('joi');

const register = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': 'Password must be at least 6 characters',
                'any.required': 'Password is required'
            })
    });
    return schema.validate(data);
};

const login = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.min': 'Password must be at least 6 characters',
                'any.required': 'Password is required'
            })
    });
    return schema.validate(data);
};

const verifyOTP = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            }),
        otp: Joi.string()
            .pattern(/^\d{6}$/)
            .required()
            .messages({
                'string.pattern.base': 'OTP should be exactly 6 digits',
                'any.required': 'OTP is required'
            })
    });
    return schema.validate(data);
};

const resendOTP = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            })
    });
    return schema.validate(data);
};

module.exports = { register, login, verifyOTP, resendOTP };
