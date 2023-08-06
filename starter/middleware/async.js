const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
        //next : pass the error to the next middleware
      next(error);
    }
  };
};

module.exports = asyncWrapper;
