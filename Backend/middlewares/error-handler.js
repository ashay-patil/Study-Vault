const {CustomAPIError}= require('../errors');
const {StatusCodes} = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ error : true, msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : true, msg :err.message})  // InternalServerError corresponds to 500
}

module.exports = errorHandlerMiddleware;