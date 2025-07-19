const Resource = require('../models/resource');


// GET /api/resources?page=1&search=math&subject=Math
const getAllResources = async (req, res) => {
    try {
      const { page = 1, search = '', subject = '', semester = '' } = req.query;
      const limit = 8;
      const skip = (page - 1) * limit;
  
      const filter = {
        ...(subject && { subject }),
        ...(semester && { semester }),
        ...(search && {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ]
        })
      };
  
      const total = await Resource.countDocuments(filter);
      const resources = await Resource.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('uploadedBy', 'name');
  
      res.json({ resources, totalPages: Math.ceil(total / limit), currentPage: +page });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching resources', error: err.message });
    }
};

const getSingleResource = async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id).populate('uploadedBy', 'name');
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
  
      res.json(resource);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching resource', error: err.message });
    }
};

module.exports = {getAllResources, getSingleResource};