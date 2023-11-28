const response = (res, statusCode, data, message) => {
  return res.status(statusCode).send({ status: statusCode, message, data });
};

const errResponse = (res, statusCode, message) => {
  return res.status(statusCode).send({ status: statusCode, message });
};
module.exports = {response, errResponse};
