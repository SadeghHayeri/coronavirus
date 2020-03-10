const { ROLES } = require('../config/enums');

function _hasDefaultAccess(user, targetUser) {
	switch (targetUser.role) {
		case ROLES.ADMIN:
		case ROLES.CHIEF:
			return [ROLES.ADMIN].includes(user.role);
		case ROLES.STAFF:
			return [ROLES.ADMIN, ROLES.CHIEF].includes(user.role);
		case ROLES.FAMILY_HEAD:
		case ROLES.PATIENT:
			return [ROLES.ADMIN, ROLES.CHIEF, ROLES.STAFF].includes(user.role);
		default:
			throw new Error('BAD ROLES'); // TODO: Use error classes
	}
}

function hasCreateAccess(user, targetUser) {
	return _hasDefaultAccess(user, targetUser);
}

function hasEditAccess(user, targetUser, update) {
	if (user.role === ROLES.ADMIN) {
		return true;
	}

	if (update.role && targetUser.role !== update.role) {
		return false;
	}

	if (update.registrar && targetUser.registrar !== update.registrar) {
		return false;
	}

	if (targetUser.role === user.role) {
		return false;
	}

	return _hasDefaultAccess(user, targetUser);
}

function hasReadAccess(user, targetUser) {
	if (user.id === targetUser.id) {
		return true;
	}

	if (user.id === targetUser.parent) {
		return true;
	}

	return _hasDefaultAccess(user, targetUser);
}

module.exports = {
	hasCreateAccess,
	hasEditAccess,
	hasReadAccess,
};
