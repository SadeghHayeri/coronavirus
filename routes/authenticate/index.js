const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const local = require('../../config/local');
const { user: userService } = require('../../domin');

router.post('/', async (req, res) => {
	const {username, passowrd} = req.body;
	const user = await userService.authenticate(username, passowrd);

	if (user) {
		res.json(user);
	} else {
		res.status(HttpStatus.UNAUTHORIZED).json({ message: local.BAD_USERNAME_OR_PASSWORD });
	}
});

module.exports = router;
