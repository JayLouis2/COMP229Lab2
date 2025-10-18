const Service = require('../models/service.model');
const { crudController } = require('./template');
module.exports = crudController(Service, 'service');
