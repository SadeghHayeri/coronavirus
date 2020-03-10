const User = require('../models/user');

async function getUserByUsernameAndPassword(username, password) {
	return User.findOne({username, password});
}

async function getById(id) {
	return User.findOne({id});
}

async function getByRoles(roles) {
	return User.find({role: {'$in': roles}});
}

async function getByRegistrarId(registrarId) {
	return User.find({registrarId});
}

async function newUser(userInfo) {
	const newUser = new User(userInfo);
	await newUser.save();
	return newUser;
}

module.exports = {
	getUserByUsernameAndPassword,
	getById,
	getByRoles,
	newUser,
	getByRegistrarId,
};
