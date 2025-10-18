const Project = require('../models/project.model');
const { crudController } = require('./template');
module.exports = crudController(Project, 'project');
