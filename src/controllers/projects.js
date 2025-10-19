const Project = require('../models/project');

exports.getAll = async (req, res, next) => {
  try { res.json(await Project.find()); } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const d = await Project.findById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Project not found' });
    res.json(d);
  } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try { res.status(201).json(await new Project(req.body).save()); } catch (e) { next(e); }
};
exports.update = async (req, res, next) => {
  try {
    const u = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!u) return res.status(404).json({ message: 'Project not found' });
    res.json(u);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const r = await Project.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project removed' });
  } catch (e) { next(e); }
};
exports.removeAll = async (req, res, next) => {
  try { await Project.deleteMany({}); res.json({ message: 'All projects removed' }); } catch (e) { next(e); }
};
