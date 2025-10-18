const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  technologies: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
