const Resource = require('../models/resource');

/*

title: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    semester: { type: String, required: true },
    description: String,
    pdfUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }


*/

const getAllResources = async (req, res) => {
    try {
      const { page = 1, search = '', subject = '', semester = '' } = req.query;
      const limit = 8;
      const skip = (page - 1) * limit;
  
      const filter = {
        ...(subject && { subject }),
        ...(semester && { semester : Number(semester) }),
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
        .limit(limit);
  
      res.json({ resources, totalPages: Math.ceil(total / limit), currentPage: +page });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching resources', error: err.message });
    }
};

const getSingleResource = async (req, res) => {
    try {
      console.log("Reached getSingleResource controller");
      console.log("req.params.id",req.params.id);
      const resource = await Resource.findById(req.params.id);
      if (!resource) return res.status(404).json({ message: 'Resource not found' });
  
      res.json(resource);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching resource', error: err.message });
    }
};

module.exports = {getAllResources, getSingleResource};