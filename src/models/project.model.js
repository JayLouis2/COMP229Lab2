const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completion: { type: Date },
  description: { type: String },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Project', ProjectSchema);
