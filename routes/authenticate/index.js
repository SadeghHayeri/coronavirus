const express = require('express');
const router = express.Router();
const { authenticate: authenticateService } = require('../../domin');

/**
 * @api {post} /authenticate Login
 * @apiName Authentication
 * @apiGroup Authentication
 *
 * @apiParam {String} nationalCode
 * @apiParam {String} password
 *
 * @apiSuccess {Object} -
 * @apiSuccess {String} -.token token
 * @apiSuccess {User} -.user user
 */
router.post('/', async (req, res) => {
	const {nationalCode, password} = req.body;
	const {user, token} = await authenticateService.authenticate(nationalCode, password);
	res.json({user, token});
});

/**
 * @api {put} /authenticate ResetPassword
 * @apiName ResetPassord
 * @apiGroup Authentication
 *
 * @apiParam {String} nationalCode
 * @apiParam {String} password
 * @apiParam {String} newPassword
 *
 * @apiSuccess {Object} -
 * @apiSuccess {String} -.token token
 * @apiSuccess {User} -.user user
 */
router.put('/', async (req, res) => {
	const {nationalCode, password, newPassword} = req.body;
	const {user, token} = await authenticateService.resetPassword(nationalCode, password, newPassword);
	res.json({user, token});
});

module.exports = router;
