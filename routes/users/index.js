const express = require('express');
const router = express.Router();
const { user: userService } = require('../../domin');
const { ROLES } = require('../../config/enums');
const HttpStatus = require('http-status-codes');
const local = require('../../config/local');
const authorize = require('../../middlewares/authorize');

router.get('/', authorize([ROLES.ADMIN]), async (req, res) => {
	const allUsers = await userService.getAll();
	res.json({ users: allUsers });
});

router.get('/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	const authorizedRoles = [ROLES.ADMIN, ROLES.CHIEF, ROLES.STAFF];
	if (req.user.id !== id && authorizedRoles.includes(req.user.role)) {
		return res.status(HttpStatus.UNAUTHORIZED).json({ message: local.UNAUTHORIZED_ERROR });
	}

	const user = await userService.getById(id);
	if (!user) {
		return res.status(HttpStatus.NOT_FOUND).json({ message: local.NOT_FOUND_ERROR });
	}

	res.json({ user });
});

module.exports = router;
