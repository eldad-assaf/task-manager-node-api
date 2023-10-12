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

const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.msg);
  console.log(err);

  let customError = {
    //set defualts
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something went wrong, try again later.",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })

  if (err.code && err.code === 11000) {
    console.log(err);
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value `;
    customError.statusCode = 400
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
