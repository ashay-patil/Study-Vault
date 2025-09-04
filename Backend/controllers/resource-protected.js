const Resource = require('../models/resource');
const uploadToCloudinary = require('../services/cloudinaryService');


const uploadResource = async (req, res) => {
    try {
      const { title, subject, semester, description } = req.body;
      const url = req.file?.path;
      console.log("url",url);
      const result = await uploadToCloudinary(url);
      const pdfUrl = result.secure_url;
      console.log("pdfUrl",pdfUrl);
      if (!pdfUrl) return res.status(400).json({ message: 'PDF is required' });
  
      const newResource = new Resource({
        title,
        subject,
        semester : Number(semester),
        description,
        pdfUrl,
        uploadedBy: req.user.id,
        uploadedByEmail: req.user.email
      });
  
      const saved = await newResource.save();
      res.status(201).json(saved);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Upload failed', error: err.message });
    }
};
  

const getMyResources = async (req, res) => {
    try {
      console.log("Reached getMyResources controller");
      console.log("req.user.id",req.user.id);
      const myResources = await Resource.find({ uploadedBy: req.user.id }).sort({ createdAt: -1 });
      res.json(myResources);
      console.log("myResources",myResources);
    } catch (err) {
      res.status(500).json({ message: 'Could not fetch your resources. Try again later', error: err.message });
    }
};
  

const updateResource = async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id);
  
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
      if (resource.uploadedBy.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      const { title, subject, semester, description } = req.body;
      let pdfUrl = resource.pdfUrl;

      if (req.file) {
        const url = req.file?.path;
        const result = await uploadToCloudinary(url);
        pdfUrl = result.secure_url;
        console.log("Updated pdfUrl",pdfUrl);

      }
  
      resource.title = title || resource.title;
      resource.subject = subject || resource.subject;
      resource.semester = semester ? Number(semester) : resource.semester;
      resource.description = description || resource.description;
      resource.pdfUrl = pdfUrl || resource.pdfUrl;
      const updated = await resource.save();
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Update failed', error: err.message });
    }
};
  

const addReview = async (req, res) => {
    try {
      const { rating, comment } = req.body;
      console.log("Reached addReview controller");
      console.log("req.body",req.body);
      console.log("req.params.id",req.params.id);
      console.log("req.user.id",req.user.id);
      const resource = await Resource.findById(req.params.id);
      console.log("resource",resource);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
  
      
  
      const newReview = {
        user: req.user.id,
        email: req.user.email,
        rating: Number(rating),
        comment
      };
  
      resource.reviews.push(newReview);
  
      // Recalculate average rating
      resource.averageRating =
        resource.reviews.reduce((sum, r) => sum + r.rating, 0) / resource.reviews.length;
  
      await resource.save();
  
      res.status(201).json({ message: 'Review added' });
    } catch (err) {
      res.status(500).json({ message: 'Error adding review', error: err.message });
    }
};


const deleteResource = async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
  
      if (resource.uploadedBy.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await resource.deleteOne();
      console.log("Resource deleted successfully");
      res.json({ message: 'Resource deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Delete failed', error: err.message });
    }
};

module.exports = {uploadResource, getMyResources, updateResource, addReview, deleteResource};