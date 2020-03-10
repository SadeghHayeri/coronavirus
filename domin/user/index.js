const authenticate = require('./autenticate');
const { user: userDA } = require('../../dataAccess');
const { ROLE } = require('../../config/enums');

function _withoutPassword(user) {
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

// TODO: Use pagination
async function getByRoles(roles) {
	const users = await userDA.getByRoles(roles);
	return users.map(_withoutPassword);
}

async function getByRegistrarId(registrarId) {
	const users = await userDA.getByRegistrarId(roles);
	return users.map(_withoutPassword);
};

async function getById(id, withPassword = false) {
	const user = await userDA.getById(id);
	return withPassword ? user : _withoutPassword(user);
}

async function getChildUsers(user) {
	const {id: userId, role: userRole} = user;

	switch (userRole) {
		case ROLE.ADMIN:
			return getByRoles(Object.values(ROLE));
		case ROLE.CHIEF:
			return getByRoles([ROLE.STAFF, ROLE.FAMILY_HEAD, ROLE.PATIENT]);
		case ROLE.FAMILY_HEAD:
			const self = await getById(userId);
			const child = await getByRegistrarId(userId);
			return [self, ...child];
		case ROLE.PATIENT:
			return getById(userId);
	}
	return [];
}

function hasAccessOnOtherUser(user, targetUser) {
	const {id: userId, role: userRole} = user;

	if (userId === targetUser.id) {
		return true;
	}

	switch (userRole) {
		case ROLE.ADMIN:
			return true;
		case ROLE.CHIEF:
			return [ROLE.STAFF, ROLE.FAMILY_HEAD, ROLE.PATIENT].includes(targetUser.role);
		case ROLE.FAMILY_HEAD:
			return targetUser.registrarId === userId;
		case ROLE.PATIENT:
			return false;
	}
	return false;
}

// TODO: Throw new error, and handle with errorHandler middleware
async function createUser(user, userInfo) {
	const {role: newUserRole} = userInfo;
	const {id: userId, role: userRole} = user;

	if ((newUserRole === ROLES.ADMIN && ![ROLES.ADMIN].includes(userRole))
		|| (newUserRole === ROLES.CHIEF && ![ROLES.ADMIN].includes(userRole))
		|| (newUserRole === ROLES.STAFF && ![ROLES.ADMIN, ROLES.CHIEF].includes(userRole))
		|| (newUserRole === ROLES.FAMILY_HEAD && ![ROLES.ADMIN, ROLES.CHIEF, ROLES.STAFF].includes(userRole))
		|| (newUserRole === ROLES.PATIENT && userRole === ROLE.PATIENT)) {
		throw new Error('UNAUTHORIZED'); // TODO: Use error classes
	}

	userInfo.registrarId = userId;
	return userDA.newUser(userInfo);
}

module.exports = {
	authenticate,
	getById,
	createUser,
	getChildUsers,
	hasAccessOnOtherUser,
};