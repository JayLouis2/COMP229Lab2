const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/contacts.routes');
const projectsRouter = require('./routes/projects.routes');
const servicesRouter = require('./routes/services.routes');
const usersRouter = require('./routes/users.routes');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Root endpoint for assignment and quick health check
app.get('/', (req, res) => {
	res.json({ success: true, message: 'Portfolio API - Node.js, Express & MongoDB' });
});

app.use('/api/contacts', contactsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);

app.use((req, res, next) => next(createError(404, 'Endpoint not found')));
app.use(errorHandler);

module.exports = app;
