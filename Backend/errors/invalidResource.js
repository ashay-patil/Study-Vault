const CustomAPIError = require('./customAPIerrors');
const { StatusCodes } = require('http-status-codes');

class InvalidResource extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = InvalidResource;