const CustomAPIError = require('./customAPIerrors');
const {StatusCodes} = require('http-status-codes');
class InvalidCredentials extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
  
module.exports = InvalidCredentials;