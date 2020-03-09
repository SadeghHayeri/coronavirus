const jwt = require('jsonwebtoken');
const dataAccess = require('../../dataAccess');
const { JWT_SECRET } = require('../../config/tokens');

async function authenticate(username, password) {
	const user = await dataAccess.user.getUserByUsernameAndPassword(username, password);
	if (user) {
		const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
		const { password, ...userWithoutPassword } = user;
		return {
			...userWithoutPassword,
			token
		};
	}
}

module.exports = {
	authenticate,
};