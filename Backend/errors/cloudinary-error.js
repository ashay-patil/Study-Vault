const CustomAPIError = require('./customAPIerrors');

class CloudinaryError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

module.exports = CloudinaryError;