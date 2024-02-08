const errorHandlingMiddlware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  console.log(err.message);
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: process.env.NODE_ENV === "production" ? "Error" : err.message,
  });
};

module.exports = errorHandlingMiddlware;
