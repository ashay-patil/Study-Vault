const CustomAPIError = require('./customAPIerrors');
const BadRequest = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const InvalidCredentials = require('./invalid-credentials');
const CloudinaryError = require('./cloudinary-error');
const InvalidResource = require('./invalidResource');
module.exports = {CustomAPIError, BadRequest, UnauthenticatedError,InvalidResource, InvalidCredentials, CloudinaryError};