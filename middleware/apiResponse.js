const apiResponse = (req, res, next) => {
  res.apiSucessfull = (data) => {
    res.status(200).json({ status: 200, data });
  };
  next();
};
export default apiResponse;
