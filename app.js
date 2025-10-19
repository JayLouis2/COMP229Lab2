const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/contacts.routes');
const projectsRouter = require('./routes/projects.routes');
const servicesRouter = require('./routes/services.routes');
const usersRouter = require('./routes/users.routes');
const indexRouter = require('./routes/index');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Root router (assignment requirement)
app.use('/', indexRouter);

app.use('/api/contacts', contactsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);

app.use((req, res, next) => next(createError(404, 'Endpoint not found')));
app.use(errorHandler);

module.exports = app;
