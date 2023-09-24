// const { CustomAPIError } = require("../errors/custom-error");

// const errorHandlerMiddleware = (err, req, res, next) => {
//   console.log('errorHandlerMiddleware');
//   console.log(err instanceof CustomAPIError);
//   if (err instanceof CustomAPIError) {
//     return res.status(err.statusCode).json({ msg: err.message });
//   }

//   return res
//     .status(500)
//     .json({ msg: "Something went wrong, please try again" });
// };

// module.exports = errorHandlerMiddleware;


const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('errorHandlerMiddleware');
  console.log(err.msg);
  console.log(err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
