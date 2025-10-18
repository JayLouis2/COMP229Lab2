const createError = require('http-errors');

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, status, message });
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);
}
module.exports = { errorHandler };
