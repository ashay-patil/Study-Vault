const express = require('express');
const router = express.Router();
const {getAllResources, getSingleResource} = require('../controllers/resource-public');
const {getResourcesValidationMiddleware, getResourceByIdValidationMiddleware} = require('../middlewares/resource-public-validation');

router.get('/get-all-resources', getResourcesValidationMiddleware, getAllResources);
router.get('/get-single-resource/:id', getResourceByIdValidationMiddleware, getSingleResource);

module.exports = router;