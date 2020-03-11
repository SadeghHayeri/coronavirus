const express = require('express');
const router = express.Router();
const {user: userService} = require('../../domin');
// const HttpStatus = require('http-status-codes');
// const local = require('../../config/local');
const authorize = require('../../middlewares/authorize');




/**
 * @api {get} /user Get all users
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiSuccess {User[]} users list of users
 */
router.get('/', authorize(), async (req, res) => {
	const childUsers = await userService.getChildUsers(req.user);
	res.json({users: childUsers});
});

/**
 * @api {get} /user/:id Get specific user
 * @apiName getUser
 * @apiGroup User
 * @apiSuccess {User} user
 */
router.get('/:id', authorize(), async (req, res) => {
	const userId = parseInt(req.params.id);
	const user = await userService.getUser(req.user, userId);
	res.json({user});
});

/**
 * @api {post} /user Create new user
 * @apiName CreateUser
 *
 * @apiParam {User} user
 *
 * @apiGroup User
 * @apiSuccess {User} user
 */
router.post('/', authorize(), async (req, res) => {
	const userInfo = req.body;
	const newUser = userService.createUser(req.user, userInfo);
	res.json({user: newUser});
});

/**
 * @api {put} /user/:id Update user
 * @apiName UpdateUser
 *
 * @apiParam {User} user
 *
 * @apiGroup User
 * @apiSuccess {User} user
 */
router.put('/:id', authorize(), async (req, res) => {
	const userId = parseInt(req.params.id);
	const {user} = req.body;

	const updatedUser = await userService.editUser(req.user, userId, user);
	res.json({user: updatedUser});
});

/**
 * @api {get} /user/:id/statusHistory Get user status history
 * @apiName GetStatusHistory
 * @apiGroup User
 * @apiSuccess {StatusHistory} statusHistory
 */
router.get('/:id/statusHistory', async (req, res) => {
	const userId = parseInt(req.params.id);

	const statusHistory = await userService.getChangeStatusHistory(req.user, userId);
	res.json({statusHistory});
});

/**
 * @api {get} /user/:id/groupHistory Get user group history
 * @apiName GetGroupHistory
 * @apiGroup User
 * @apiSuccess {GroupHistory} groupHistory
 */
router.get('/:id/groupHistory', async (req, res) => {
	const userId = parseInt(req.params.id);

	const statusHistory = await userService.getChangeGroupHistory(req.user, userId);
	res.json({statusHistory});
});

module.exports = router;
