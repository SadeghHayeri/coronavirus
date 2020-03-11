const express = require('express');
const router = express.Router();
const {user: userService} = require('../../domin');
// const HttpStatus = require('http-status-codes');
// const local = require('../../config/local');
const authorize = require('../../middlewares/authorize');

/**
 * @api {get} /user Get all users
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
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

router.get('/:id/statusHistory', async (req, res) => {
	const userId = parseInt(req.params.id);
	const {user} = req.body;

	const statusHistory = await userService.getChangeStatusHistory(user, userId);
	res.json({statusHistory});
});

router.get('/:id/groupHistory', async (req, res) => {
	const userId = parseInt(req.params.id);
	const {user} = req.body;

	const statusHistory = await userService.getChangeGroupHistory(user, userId);
	res.json({statusHistory});
});

module.exports = router;
