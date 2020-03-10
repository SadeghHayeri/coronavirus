// TODO: Throw new error, and handle with errorHandler middleware

const { user: userDA } = require('../../dataAccess');
const { ROLE } = require('../../config/enums');
const accessController = require('./accessController');

async function getChildUsers(user) {
	const {id: userId, role: userRole} = user;

	switch (userRole) {
		case ROLE.ADMIN:
			return userDA.getByRoles(Object.values(ROLE));
		case ROLE.CHIEF:
			return userDA.getByRoles([ROLE.STAFF, ROLE.FAMILY_HEAD, ROLE.PATIENT]);
		case ROLE.FAMILY_HEAD:
			const self = await userDA.getById(userId);
			const child = await userDA.getByParentId(userId);
			return [self, ...child];
		case ROLE.PATIENT:
			return userDA.getById(userId);
	}
	return [];
}

async function createUser(user, newUser) {
	if (!accessController.hasCreateAccess(user, newUser)) {
		throw new Error('FORBIDDEN'); // TODO: Use error classes
	}

	newUser.registrar = user.id;
	return userDA.newUser(newUser);
}

async function editUser(user, userId, update) {
	const targetUser = await userDA.getById(userId);

	if (!accessController.hasEditAccess(user, targetUser)) {
		throw new Error('FORBIDDEN');
	}

	return userDA.updateUser(targetUser, update);
}

async function getUser(user, userId) {
	const targetUser = await userDA.getById(userId);

	if (!accessController.hasReadAccess(user, targetUser)) {
		throw new Error('FORBIDDEN');
	}

	return userDA.updateUser(targetUser, update);
}

module.exports = {
	getUser,
	createUser,
	editUser,
	getChildUsers,
};