const Joi = require('joi');


const uploadfileSchema = (fileData) => {
    console.log("file Validator : "+ fileData);
    const schema = Joi.object({
        fieldname: Joi.string().required().messages({
            'string.base': 'Field name must be a string',
            'string.empty': 'Field name cannot be empty',
            'any.required': 'Field name is required'
        }),

        originalname: Joi.string().required().messages({
            'string.base': 'Original file name must be a string',
            'string.empty': 'Original file name cannot be empty',
            'any.required': 'Original file name is required'
        }),

        encoding: Joi.string().required().messages({
            'string.base': 'Encoding must be a string',
            'string.empty': 'Encoding cannot be empty',
            'any.required': 'Encoding is required'
        }),

        mimetype: Joi.string()
            .valid('application/pdf')
            .required()
            .messages({
                'string.base': 'MIME type must be a string',
                'any.only': 'Only PDF files are allowed',
                'any.required': 'MIME type is required'
            }),

        size: Joi.number()
            .max(50 * 1024 * 1024)
            .required()
            .messages({
                'number.base': 'File size must be a number',
                'number.max': 'File size must be less than or equal to 50 MB',
                'any.required': 'File size is required'
            }),

        destination: Joi.string().optional().messages({
            'string.base': 'Destination must be a string'
        }),

        filename: Joi.string().optional().messages({
            'string.base': 'Filename must be a string'
        }),

        path: Joi.string().optional().messages({
            'string.base': 'Path must be a string'
        }),
    })
    .required().messages({
        'any.required': 'File is required. Please upload a PDF file'
    });

    return schema.validate(fileData);
};

const updatefileSchema = (fileData) => {
    console.log("file Validator update: "+ fileData);
    const schema = Joi.object({
        fieldname: Joi.string().required().messages({
            'string.base': 'Field name must be a string',
            'string.empty': 'Field name cannot be empty',
            'any.required': 'Field name is required'
        }),

        originalname: Joi.string().required().messages({
            'string.base': 'Original file name must be a string',
            'string.empty': 'Original file name cannot be empty',
            'any.required': 'Original file name is required'
        }),

        encoding: Joi.string().required().messages({
            'string.base': 'Encoding must be a string',
            'string.empty': 'Encoding cannot be empty',
            'any.required': 'Encoding is required'
        }),

        mimetype: Joi.string()
            .valid('application/pdf')
            .required()
            .messages({
                'string.base': 'MIME type must be a string',
                'any.only': 'Only PDF files are allowed',
                'any.required': 'MIME type is required'
            }),

        size: Joi.number()
            .max(50 * 1024 * 1024)
            .required()
            .messages({
                'number.base': 'File size must be a number',
                'number.max': 'File size must be less than or equal to 50 MB',
                'any.required': 'File size is required'
            }),

        destination: Joi.string().optional().messages({
            'string.base': 'Destination must be a string'
        }),

        filename: Joi.string().optional().messages({
            'string.base': 'Filename must be a string'
        }),

        path: Joi.string().optional().messages({
            'string.base': 'Path must be a string'
        }),
    });

    return schema.validate(fileData);
};



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
        semester: Joi.number().min(1).max(20).required()
            .messages({
                'number.base': 'Semester must be a number',
                'number.empty': 'Semester is required',
                'number.min': 'Semester must be at least 1',
                'number.max': 'Semester must be at most 20',
                'any.required': 'Semester is required'
            }),
        description: Joi.string().max(500).allow('', null)
            .messages({
                'string.base': 'Description must be a string',
                'string.max': 'Description must be at most 500 characters'
            }),
    }).required().messages({
        'any.required': 'Complete Input is required'
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
        semester: Joi.number().min(1).max(20)
            .messages({
                'number.base': 'Semester must be a number',
                'number.min': 'Semester must be at least 1',
                'number.max': 'Semester must be at most 20'
            }),
        description: Joi.string().max(500).allow('', null)
            .messages({
                'string.base': 'Description must be a string',
                'string.max': 'Description must be at most 500 characters'
            })
    }).required().messages({
        'any.required': 'Complete Input is required'
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
    }).required().messages({
        'any.required': 'Complete Input is required'
    });
    return schema.validate(data);
    
};

module.exports = {
    uploadResource,
    updateResource,
    addReview,
    uploadfileSchema,
    updatefileSchema
};
