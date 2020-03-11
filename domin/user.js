// TODO: Throw new error, and handle with errorHandler middleware

const { user: userDA, statusHistory: statusHistoryDA, groupHistory: groupHistoryDA  } = require('../dataAccess');
const { ROLES } = require('../config/enums');
const accessController = require('./accessController');

async function getChildUsers(user) {
	const {id: userId, role: userRole} = user;

	switch (userRole) {
		case ROLES.ADMIN:
			return userDA.getByRoles(Object.values(ROLES));
		case ROLES.CHIEF:
			return userDA.getByRoles([ROLES.STAFF, ROLES.FAMILY_HEAD, ROLES.PATIENT]);
		case ROLES.FAMILY_HEAD:
			const self = await userDA.getById(userId);
			const child = await userDA.getByParentId(userId);
			return [self, ...child];
		case ROLES.PATIENT:
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

	if (update.status && user.status !== update.status) {
		statusHistoryDA.logChangeStatusHistory(user.id, userId, update.status);
	}

	if (update.group && user.group !== update.group) {
		groupHistoryDA.logChangeGroupHistory(user.id, userId, update.group);
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

async function getChangeStatusHistory(user, userId) {
	const targetUser = await userDA.getById(userId);

	if (!accessController.hasReadAccess(user, targetUser)) {
		throw new Error('FORBIDDEN');
	}

	return statusHistoryDA.getUserChangeStatusHistory(userId);
}

async function getChangeGroupHistory(user, userId) {
	const targetUser = await userDA.getById(userId);

	if (!accessController.hasReadAccess(user, targetUser)) {
		throw new Error('FORBIDDEN');
	}

	return groupHistoryDA.getUserChangeGroupHistory(userId);
}

module.exports = {
	getUser,
	createUser,
	editUser,
	getChildUsers,
	getChangeStatusHistory,
	getChangeGroupHistory,
};