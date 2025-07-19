const Joi = require('joi');

const getResources = (data) => {
    const schema = Joi.object({
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
        search: Joi.string().max(100)
            .messages({
                'string.base': 'Search must be a string',
                'string.max': 'Search must be at most 100 characters'
            }),
        page: Joi.number().integer().min(1)
            .messages({
                'number.base': 'Page must be a number',
                'number.min': 'Page must be at least 1'
            }),
        limit: Joi.number().integer().min(1).max(100)
            .messages({
                'number.base': 'Limit must be a number',
                'number.min': 'Limit must be at least 1',
                'number.max': 'Limit must be at most 100'
            })
    });
    return schema.validate(data);
};

const getResourceById = (data) => {
    const schema = Joi.object({
        id: Joi.string().length(24).hex().required()
            .messages({
                'string.base': 'Resource ID must be a string',
                'string.length': 'Resource ID must be 24 characters',
                'string.hex': 'Resource ID must be a valid hex string',
                'any.required': 'Resource ID is required'
            })
    });
    return schema.validate(data);
};

const getReviews = (data) => {
    const schema = Joi.object({
        resourceId: Joi.string().length(24).hex().required()
            .messages({
                'string.base': 'Resource ID must be a string',
                'string.length': 'Resource ID must be 24 characters',
                'string.hex': 'Resource ID must be a valid hex string',
                'any.required': 'Resource ID is required'
            }),
        page: Joi.number().integer().min(1)
            .messages({
                'number.base': 'Page must be a number',
                'number.min': 'Page must be at least 1'
            }),
        limit: Joi.number().integer().min(1).max(100)
            .messages({
                'number.base': 'Limit must be a number',
                'number.min': 'Limit must be at least 1',
                'number.max': 'Limit must be at most 100'
            })
    });
    return schema.validate(data);
};

module.exports = {
    getResources,
    getResourceById,
    getReviews
};
