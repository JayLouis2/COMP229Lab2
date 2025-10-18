const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Service', ServiceSchema);
