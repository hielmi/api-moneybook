const errorHandlingMiddlware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.customMessage = err.customMessage || "Something Error";
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message:
      process.env.NODE_ENV === "production" ? err.customMessage : err.message,
  });
};

module.exports = errorHandlingMiddlware;
