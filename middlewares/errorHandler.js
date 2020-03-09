const HttpStatus = require('http-status-codes');
const local = require('../config/local');

function errorHandler(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		return res.status(HttpStatus.UNAUTHORIZED).json({ message: local.INVALID_TOKEN_ERROR });
	}

	return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: local.UNKNOWN_ERROR });
}

module.exports = errorHandler;
