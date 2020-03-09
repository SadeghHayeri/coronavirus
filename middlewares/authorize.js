const expressJwt = require('express-jwt');
const { JWT_SECRET } = require('../config/tokens');


function authorize(roles = []) {
	if (typeof roles === 'string') {
		roles = [roles];
	}

	return [
		expressJwt({ secret: JWT_SECRET }),

		(req, res, next) => {
			if (roles.length && !roles.includes(req.user.role)) {
				return res.status(401).json({ message: 'Unauthorized' });
			}
			next();
		}
	];
}

module.exports = authorize;
