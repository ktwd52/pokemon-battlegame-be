const errorHanddler = (err, req, res, next) => {
  process.env.NODE_ENV !== "production" && console.log(err.stack);

  res.status(err.statusCode || 500).json({
    error: err.message || "Uncategorized Server Error",
  });
};

export default errorHanddler;
