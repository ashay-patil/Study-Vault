const { InvalidResource } = require("../errors");
const { uploadResource, updateResource, addReview, uploadfileSchema, updatefileSchema } = require("../validators/resource-protected");
const fs = require('fs');
const uploadResourceValidationMiddleware = (req, res, next) => {
    console.log("UploadResource Validation reached");
    const { error } = uploadResource(req.body);
    if (error) {
        console.log("validation error",error.details[0].message);
        console.log(req.body);
        if(req.file?.path) fs.unlinkSync(req.file.path);
        throw new InvalidResource(error.details[0].message);
    }
    const {error : fileError} = uploadfileSchema(req.file);
    console.log("fileError : "+ fileError);
    if(fileError){
        if(req.file?.path) fs.unlinkSync(req.file.path);
        console.log('file validation error : ', fileError.details[0].message);
        throw new InvalidResource(fileError.details[0].message);
    }
    next();
};

const updateResourceValidationMiddleware = (req, res, next) => {
    console.log("req.body",req.body);
    const { error } = updateResource(req.body);
    if (error) {
        if(req.file?.path) fs.unlinkSync(req.file.path);
        console.log("validation error",error.details[0].message);
        throw new InvalidResource(error.details[0].message);
    }

    const {error : fileError} = updatefileSchema(req.file);
    console.log("fileError : "+ fileError);
    if(fileError){
        if(req.file?.path) fs.unlinkSync(req.file.path);
        console.log('file validation error : ', fileError.details[0].message);
        throw new InvalidResource(fileError.details[0].message);
    }
    next();
};

const addReviewValidationMiddleware = (req, res, next) => {
    const { error } = addReview(req.body);
    if (error) {
        console.log(error.details[0].message);
        throw new InvalidResource(error.details[0].message);
    }
    next();
};

module.exports = {
    uploadResourceValidationMiddleware,
    updateResourceValidationMiddleware,
    addReviewValidationMiddleware
};
