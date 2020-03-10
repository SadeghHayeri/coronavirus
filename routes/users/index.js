const express = require('express');
const router = express.Router();
const { user: userService } = require('../../domin');
const { ROLES } = require('../../config/enums');
const HttpStatus = require('http-status-codes');
const local = require('../../config/local');
const authorize = require('../../middlewares/authorize');

router.get('/', authorize(), async (req, res) => {
	const childUsers = await userService.getChildUsers(req.user);
	res.json({ users: childUsers });
});

router.get('/:id', authorize(), async (req, res) => {
	const targetId = parseInt(req.params.id);

	const targetUser = await userService.getById(targetId);
	if (!targetUser) {
		return res.status(HttpStatus.NOT_FOUND).json({ message: local.NOT_FOUND_ERROR });
	}


	if (!userService.hasAccessOnOtherUser(req.user, targetUser)) {
		return res.status(HttpStatus.FORBIDDEN).json({ message: local.FORBIDDEN_ERROR });
	}

	res.json({ user: targetUser });
});

router.post('/', authorize(), async (req, res) => {
	const userInfo = req.body;
	const newUser = userService.createUser(req.user, userInfo);
	res.json({ user: newUser });
});

module.exports = router;
