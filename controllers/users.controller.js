const User = require('../models/user.model');
const { crudController } = require('./template');
module.exports = crudController(User, 'user');
