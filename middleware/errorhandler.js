export const errorHandler = (error, req, res, next) => {
  console.log("Error handled by errorHandler middleware:", error);
  error.status = error.status || 500;
  error.message = error.message || "error";
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
};
