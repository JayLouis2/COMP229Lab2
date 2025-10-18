const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/contacts');
const projectsRouter = require('./routes/projects');
const servicesRouter = require('./routes/services');
const usersRouter = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/contacts', contactsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// Error handler (last middleware)
app.use(errorHandler);

module.exports = app;
