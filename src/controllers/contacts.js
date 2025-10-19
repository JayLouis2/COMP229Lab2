const Contact = require('../models/contact');

exports.getAll = async (req, res, next) => {
  try {
    const docs = await Contact.find();
    res.json(docs);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const doc = await Contact.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Contact not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const newDoc = new Contact(req.body);
    const saved = await newDoc.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const removed = await Contact.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact removed' });
  } catch (err) { next(err); }
};

exports.removeAll = async (req, res, next) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts removed' });
  } catch (err) { next(err); }
};
