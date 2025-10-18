const Contact = require('../models/contact.model');
const { crudController } = require('./template');
module.exports = crudController(Contact, 'contact');
