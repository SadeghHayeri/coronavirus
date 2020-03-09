const User = require('../models/user');

async function getUserByUsernameAndPassword(username, password) {
	return User.findOne({username, password});
}

async function getById(id) {
	return User.findOne({id});
}

async function getAll() {
	return User.find({});
}

module.exports = {
	getUserByUsernameAndPassword,
	getById,
	getAll,
};
