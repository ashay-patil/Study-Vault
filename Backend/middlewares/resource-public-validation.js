const { InvalidResource } = require("../errors");
const { getResources, getResourceById, getReviews } = require("../validators/resource-public");

const getResourcesValidationMiddleware = (req, res, next) => {
    const { error } = getResources(req.query);
    if (error) {
        throw new InvalidResource(error.details[0].message);
    }
    next();
};

const getResourceByIdValidationMiddleware = (req, res, next) => {
    const { error } = getResourceById({ id: req.params.id });
    if (error) {
        throw new InvalidResource(error.details[0].message);
    }
    next();
};

const getReviewsValidationMiddleware = (req, res, next) => {
    const { error } = getReviews({ 
        resourceId: req.params.resourceId, 
        page: req.query.page, 
        limit: req.query.limit 
    });
    if (error) {
        throw new InvalidResource(error.details[0].message);
    }
    next();
};

module.exports = {
    getResourcesValidationMiddleware,
    getResourceByIdValidationMiddleware,
    getReviewsValidationMiddleware
};
