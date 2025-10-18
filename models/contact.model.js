const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
});

module.exports = mongoose.model('Contact', ContactSchema);
