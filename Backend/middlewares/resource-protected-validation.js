const { InvalidResource } = require("../errors");
const { uploadResource, updateResource, addReview } = require("../validators/resource-protected");

const uploadResourceValidationMiddleware = (req, res, next) => {
    console.log("req.body",req.body);
    const { error } = uploadResource(req.body);
    if (error) {
        console.log("validation error",error.details[0].message);
        console.log(req.body);
        throw new InvalidResource(error.details[0].message);
    }
    next();
};

const updateResourceValidationMiddleware = (req, res, next) => {
    const { error } = updateResource(req.body);
    if (error) {
        console.log(error.details[0].message);
        throw new InvalidResource(error.details[0].message);
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
