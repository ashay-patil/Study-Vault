const mongoose = require('mongoose');
const reviewSchema = require('./review');
const User = require('./user');


const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true },
    description: String,
    pdfUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedByEmail: { type: String, required: true },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('resource', resourceSchema);