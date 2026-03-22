const {CustomAPIError, CloudinaryError}= require('../errors');
const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    // if(err instanceof CloudinaryError) {
    //   console.log("cloudinary error handler ",err);
    // }
    return res.status(err.statusCode).json({ error : true, msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : true, msg :err.message})  // InternalServerError corresponds to 500
}

module.exports = errorHandlerMiddleware;