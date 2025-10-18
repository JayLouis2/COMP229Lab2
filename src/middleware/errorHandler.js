// errorHandler.js
module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // log error
  console.error(err);

  res.status(status).json({
    status: 'error',
    statusCode: status,
    message,
  });
};
