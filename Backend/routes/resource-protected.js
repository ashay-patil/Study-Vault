const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const upload = require('../middlewares/multer-fileupload');
const {uploadResource, getMyResources, updateResource, addReview, deleteResource} = require('../controllers/resource-protected');
const {uploadResourceValidationMiddleware, updateResourceValidationMiddleware, addReviewValidationMiddleware} = require('../middlewares/resource-protected-validation');

router.use(authorize);

router.post('/upload-my-resource', upload.single('pdf'), uploadResourceValidationMiddleware, uploadResource);
router.get('/get-my-resources', getMyResources);
router.put('/update-my-resource/:id', upload.single('pdf'), updateResourceValidationMiddleware, updateResource);
router.post('/add-review/:id', addReviewValidationMiddleware, addReview);
router.delete('/delete-my-resource/:id', deleteResource);

module.exports = router;
