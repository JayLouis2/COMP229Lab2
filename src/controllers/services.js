const Service = require('../models/service');

exports.getAll = async (req, res, next) => {
  try { res.json(await Service.find()); } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const d = await Service.findById(req.params.id);
    if (!d) return res.status(404).json({ message: 'Service not found' });
    res.json(d);
  } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try { res.status(201).json(await new Service(req.body).save()); } catch (e) { next(e); }
};
exports.update = async (req, res, next) => {
  try {
    const u = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!u) return res.status(404).json({ message: 'Service not found' });
    res.json(u);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const r = await Service.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service removed' });
  } catch (e) { next(e); }
};
exports.removeAll = async (req, res, next) => {
  try { await Service.deleteMany({}); res.json({ message: 'All services removed' }); } catch (e) { next(e); }
};
