const express = require('express');
const router = express.Router();
const {getAllResources, getSingleResource} = require('../controllers/resource-public');
const {getResourcesValidationMiddleware, getResourceByIdValidationMiddleware, getReviewsValidationMiddleware} = require('../middlewares/resource-public-validation');

router.get('/get-all-resources', getResourcesValidationMiddleware, getAllResources);
router.get('/get-single-resource/:id', getSingleResource);
// router.get('/get-reviews/:resourceId', getReviewsValidationMiddleware, getReviews);

module.exports = router;