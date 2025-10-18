const Service = require('../models/service.model');
const { asyncHandler } = require('./baseController');

exports.getAll = asyncHandler(async (req, res) => {
  const items = await Service.find();
  res.json(items);
});

exports.getById = asyncHandler(async (req, res) => {
  const item = await Service.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Service not found' });
  res.json(item);
});

exports.create = asyncHandler(async (req, res) => {
  const created = await Service.create(req.body);
  res.status(201).json(created);
});

exports.update = asyncHandler(async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Service not found' });
  res.json(updated);
});

exports.remove = asyncHandler(async (req, res) => {
  const removed = await Service.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service removed' });
});

exports.removeAll = asyncHandler(async (req, res) => {
  await Service.deleteMany({});
  res.json({ message: 'All services removed' });
});
