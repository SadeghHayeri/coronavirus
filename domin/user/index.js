const authenticate = require('./autenticate');
const { user: userDA } = require('../../dataAccess');

async function getAll() {
	const allUsers = await userDA.getAll();
	return allUsers.map(user => {
		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	});
}

async function getById(id, withPassword = false) {
	const user = await userDA.getById(id);
	const { password, ...userWithoutPassword } = user;
	return withPassword ? user : userWithoutPassword;
}

module.exports = {
	authenticate,
	getAll,
	getById
};