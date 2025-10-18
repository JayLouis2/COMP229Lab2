const Contact = require('../models/contact.model');
const { asyncHandler } = require('./baseController');

exports.getAll = asyncHandler(async (req, res) => {
  const items = await Contact.find();
  res.json(items);
});

exports.getById = asyncHandler(async (req, res) => {
  const item = await Contact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Contact not found' });
  res.json(item);
});

exports.create = asyncHandler(async (req, res) => {
  const created = await Contact.create(req.body);
  res.status(201).json(created);
});

exports.update = asyncHandler(async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Contact not found' });
  res.json(updated);
});

exports.remove = asyncHandler(async (req, res) => {
  const removed = await Contact.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Contact not found' });
  res.json({ message: 'Contact removed' });
});

exports.removeAll = asyncHandler(async (req, res) => {
  await Contact.deleteMany({});
  res.json({ message: 'All contacts removed' });
});
