const User = require('../models/user');

exports.getAll = async (req, res, next) => {
  try { res.json(await User.find().select('-password')); } catch (e) { next(e); }
};
exports.getById = async (req, res, next) => {
  try {
    const d = await User.findById(req.params.id).select('-password');
    if (!d) return res.status(404).json({ message: 'User not found' });
    res.json(d);
  } catch (e) { next(e); }
};
exports.create = async (req, res, next) => {
  try {
    const u = new User(req.body);
    const saved = await u.save();
    const obj = saved.toObject(); delete obj.password;
    res.status(201).json(obj);
  } catch (e) { next(e); }
};
exports.update = async (req, res, next) => {
  try {
    // update 'updated' manually if necessary
    req.body.updated = Date.now();
    const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!u) return res.status(404).json({ message: 'User not found' });
    res.json(u);
  } catch (e) { next(e); }
};
exports.remove = async (req, res, next) => {
  try {
    const r = await User.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User removed' });
  } catch (e) { next(e); }
};
exports.removeAll = async (req, res, next) => {
  try { await User.deleteMany({}); res.json({ message: 'All users removed' }); } catch (e) { next(e); }
};
