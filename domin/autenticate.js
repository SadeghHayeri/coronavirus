const jwt = require('jsonwebtoken');
const dataAccess = require('../dataAccess');
const { JWT_SECRET } = require('../config/tokens');
const local = require('../config/local');

function getToken(user) {
	return jwt.sign({id: user.id, role: user.role}, JWT_SECRET);
}

async function authenticate(nationalCode, password) {
	const user = await dataAccess.user.getByNationalCode(nationalCode, true);

	if (!user || !user.comparePassword(password)) {
		throw local.BAD_NATIONAL_CODE_OR_PASSWORD;
	}

	if (!user.isActive) {
		throw local.NOT_ACTIVATE_ERROR;
	}

	if (user.needResetPassword) {
		throw local.RESET_PASSWORD_REQUIRED;
	}

	const token = getToken(user);
	const {password: _, ...userWithoutPassword} = user;
	return {
		...userWithoutPassword,
		token
	};
}

async function resetPassword(nationalCode, password, newPassword) {
	const user = await dataAccess.user.getByNationalCode(nationalCode, true);

	if (!user || !user.comparePassword(password)) {
		throw local.BAD_NATIONAL_CODE_OR_PASSWORD;
	}

	if (!user.isActive) {
		throw local.NOT_ACTIVATE_ERROR;
	}

	user.password = newPassword;
	await user.save();

	const token = getToken(user);
	const {password: _, ...userWithoutPassword} = user;
	return {
		...userWithoutPassword,
		token
	};
}

module.exports = {
	authenticate,
	resetPassword,
};