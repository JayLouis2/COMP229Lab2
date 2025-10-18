const Project = require('../models/project.model');
const { asyncHandler } = require('./baseController');

exports.getAll = asyncHandler(async (req, res) => {
  const items = await Project.find();
  res.json(items);
});

exports.getById = asyncHandler(async (req, res) => {
  const item = await Project.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Project not found' });
  res.json(item);
});

exports.create = asyncHandler(async (req, res) => {
  const created = await Project.create(req.body);
  res.status(201).json(created);
});

exports.update = asyncHandler(async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
});

exports.remove = asyncHandler(async (req, res) => {
  const removed = await Project.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project removed' });
});

exports.removeAll = asyncHandler(async (req, res) => {
  await Project.deleteMany({});
  res.json({ message: 'All projects removed' });
});
