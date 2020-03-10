const { ROLE } = require('../../config/enums');

function _hasDefaultAccess(user, targetUser) {
	switch (targetUser.role) {
		case ROLE.ADMIN:
		case ROLE.CHIEF:
			return [ROLE.ADMIN].includes(user.role);
		case ROLE.STAFF:
			return [ROLE.ADMIN, ROLE.CHIEF].includes(user.role);
		case ROLE.FAMILY_HEAD:
		case ROLE.PATIENT:
			return [ROLE.ADMIN, ROLE.CHIEF, ROLE.STAFF].includes(user.role);
		default:
			throw new Error('BAD ROLE'); // TODO: Use error classes
	}
}

function hasCreateAccess(user, targetUser) {
	return _hasDefaultAccess(user, targetUser);
}

function hasEditAccess(user, targetUser, update) {
	if (user.role === ROLE.ADMIN) {
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
