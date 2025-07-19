const Joi = require('joi');

const uploadResource = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required()
            .messages({
                'string.base': 'Title must be a string',
                'string.empty': 'Title is required',
                'string.min': 'Title must be at least 3 characters',
                'string.max': 'Title must be at most 100 characters',
                'any.required': 'Title is required'
            }),
        subject: Joi.string().min(2).max(50).required()
            .messages({
                'string.base': 'Subject must be a string',
                'string.empty': 'Subject is required',
                'string.min': 'Subject must be at least 2 characters',
                'string.max': 'Subject must be at most 50 characters',
                'any.required': 'Subject is required'
            }),
        semester: Joi.string().min(1).max(20).required()
            .messages({
                'string.base': 'Semester must be a string',
                'string.empty': 'Semester is required',
                'string.min': 'Semester must be at least 1 character',
                'string.max': 'Semester must be at most 20 characters',
                'any.required': 'Semester is required'
            }),
        description: Joi.string().max(500).allow('', null)
            .messages({
                'string.base': 'Description must be a string',
                'string.max': 'Description must be at most 500 characters'
            }),
        fileUrl: Joi.string().uri().required()
            .messages({
                'string.base': 'File URL must be a string',
                'string.empty': 'File URL is required',
                'string.uri': 'File URL must be a valid URI',
                'any.required': 'File URL is required'
            })
    });
    return schema.validate(data);
};

const updateResource = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100)
            .messages({
                'string.base': 'Title must be a string',
                'string.min': 'Title must be at least 3 characters',
                'string.max': 'Title must be at most 100 characters'
            }),
        subject: Joi.string().min(2).max(50)
            .messages({
                'string.base': 'Subject must be a string',
                'string.min': 'Subject must be at least 2 characters',
                'string.max': 'Subject must be at most 50 characters'
            }),
        semester: Joi.string().min(1).max(20)
            .messages({
                'string.base': 'Semester must be a string',
                'string.min': 'Semester must be at least 1 character',
                'string.max': 'Semester must be at most 20 characters'
            }),
        description: Joi.string().max(500).allow('', null)
            .messages({
                'string.base': 'Description must be a string',
                'string.max': 'Description must be at most 500 characters'
            })
    });
    return schema.validate(data);
};

const addReview = (data) => {
    const schema = Joi.object({
        rating: Joi.number().integer().min(1).max(5).required()
            .messages({
                'number.base': 'Rating must be a number',
                'number.min': 'Rating must be at least 1',
                'number.max': 'Rating must be at most 5',
                'any.required': 'Rating is required'
            }),
        comment: Joi.string().max(500).allow('', null)
            .messages({
                'string.base': 'Comment must be a string',
                'string.max': 'Comment must be at most 500 characters'
            })
    });
    return schema.validate(data);
};

module.exports = {
    uploadResource,
    updateResource,
    addReview
};
