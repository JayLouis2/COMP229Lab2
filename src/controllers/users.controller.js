const User = require('../models/user.model');
const { asyncHandler } = require('./baseController');

exports.getAll = asyncHandler(async (req, res) => {
  const items = await User.find().select('-password');
  res.json(items);
});

exports.getById = asyncHandler(async (req, res) => {
  const item = await User.findById(req.params.id).select('-password');
  if (!item) return res.status(404).json({ message: 'User not found' });
  res.json(item);
});

exports.create = asyncHandler(async (req, res) => {
  // NOTE: password handling omitted for brevity; normally hash before storing
  const created = await User.create(req.body);
  res.status(201).json({ id: created._id, name: created.name, email: created.email });
});

exports.update = asyncHandler(async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(updated);
});

exports.remove = asyncHandler(async (req, res) => {
  const removed = await User.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User removed' });
});

exports.removeAll = asyncHandler(async (req, res) => {
  await User.deleteMany({});
  res.json({ message: 'All users removed' });
});
