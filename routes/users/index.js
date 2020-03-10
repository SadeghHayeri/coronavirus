const express = require('express');
const router = express.Router();
const {user: userService} = require('../../domin');
const HttpStatus = require('http-status-codes');
const local = require('../../config/local');
const authorize = require('../../middlewares/authorize');

router.get('/', authorize(), async (req, res) => {
	const childUsers = await userService.getChildUsers(req.user);
	res.json({users: childUsers});
});

router.get('/:id', authorize(), async (req, res) => {
	const userId = parseInt(req.params.id);
	const user = await userService.getUser(req.user, userId);
	res.json({user});
});

router.post('/', authorize(), async (req, res) => {
	const userInfo = req.body;
	const newUser = userService.createUser(req.user, userInfo);
	res.json({user: newUser});
});

router.put('/:id', authorize(), async (req, res) => {
	const userId = parseInt(req.params.id);
	const {user} = req.body;

	const updatedUser = await userService.editUser(req.user, userId, user);
	res.json({user: updatedUser});
});

module.exports = router;
