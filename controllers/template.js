const createError = require('http-errors');

exports.crudController = function (Model, name) {
  return {
    getAll: async function (req, res, next) {
      try {
        const items = await Model.find();
        res.json(items);
      } catch (err) { next(err); }
    },

    getById: async function (req, res, next) {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return next(createError(404, name + ' not found'));
        res.json(item);
      } catch (err) {
        if (err.name === 'CastError') return next(createError(400, 'Invalid ' + name + ' ID'));
        next(err);
      }
    },

    create: async function (req, res, next) {
      try {
        const created = await new Model(req.body).save();
        res.status(201).json(created);
      } catch (err) { next(err); }
    },

    update: async function (req, res, next) {
      try {
        const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return next(createError(404, name + ' not found'));
        res.json(updated);
      } catch (err) { next(err); }
    },

    remove: async function (req, res, next) {
      try {
        const deleted = await Model.findByIdAndDelete(req.params.id);
        if (!deleted) return next(createError(404, name + ' not found'));
        res.json({ message: name + ' deleted' });
      } catch (err) {
        if (err.name === 'CastError') return next(createError(400, 'Invalid ' + name + ' ID'));
        next(err);
      }
    },

    removeAll: async function (req, res, next) {
      try {
        const result = await Model.deleteMany({});
        res.json({ message: result.deletedCount + ' ' + name + 's deleted' });
      } catch (err) { next(err); }
    }
  };
};
