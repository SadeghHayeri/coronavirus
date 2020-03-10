const User = require('../models/user');

function _withoutPassword(user) {
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
}

async function getUserByUsernameAndPassword(username, password) {
	const user = await User.findOne({username, password});
	return _withoutPassword(user);
}

async function getById(id) {
	const user = await User.findOne({id});
	return _withoutPassword(user);
}

async function getByRoles(roles) {
	const users = await User.find({role: {'$in': roles}});
	return users.map(_withoutPassword);
}

async function getByParentId(parentId) {
	const users = await User.find({parent: parentId})
	return users.map(_withoutPassword);
}

async function newUser(userInfo) {
	const newUser = new User(userInfo);
	await newUser.save();
	return newUser;
}

async function updateUser(user, update) {
	user.role = update.role || user.role;
	user.nationalCode = update.nationalCode || user.nationalCode;
	user.firstName = update.firstName || user.firstName;
	user.lastName = update.lastName || user.lastName;
	user.password = update.password || user.password;
	user.birthDate = update.birthDate || user.birthDate;
	user.sex = update.sex || user.sex;
	user.status = update.status || user.status;
	user.registrar = update.registrar || user.registrar;
	user.parent = update.parent || user.parent;

	await user.save();
	return user;
}

module.exports = {
	getUserByUsernameAndPassword,
	getById,
	getByRoles,
	newUser,
	getByParentId,
	updateUser,
};
