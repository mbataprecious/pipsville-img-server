const response = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    message,
    data: data ? data : [],
  });

export default response;
