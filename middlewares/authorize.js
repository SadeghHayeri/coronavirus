const expressJwt = require('express-jwt');
const { JWT_SECRET } = require('../config/tokens');
const HttpStatus = require('http-status-codes');
const local = require('../config/local');

function authorize(roles = []) {
	if (typeof roles === 'string') {
		roles = [roles];
	}

	return [
		expressJwt({ secret: JWT_SECRET }),

		(req, res, next) => {
			if (roles.length && !roles.includes(req.user.role)) {
				return res.status(HttpStatus.FORBIDDEN).json({ message: local.FORBIDDEN_ERROR });
			}
			next();
		}
	];
}

module.exports = authorize;
