const errorHandlingMiddleware = (err, req, res, next) => {
  const errorMessage =
    err.customMessage.customMessage || "Something went wrong";
  return res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: process.env.NODE_ENV === "production" ? errorMessage : err.message,
  });
};

module.exports = errorHandlingMiddleware;
