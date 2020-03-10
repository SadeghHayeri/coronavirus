const express = require('express');
const router = express.Router();
const { authenticate: authenticateService } = require('../../domin');

router.post('/', async (req, res) => {
	const {nationalCode, password} = req.body;
	const user = await authenticateService.authenticate(nationalCode, password);
	res.json({user});
});

router.put('/', async (req, res) => {
	const {nationalCode, password, newPassword} = req.body;
	const user = await authenticateService.resetPassword(nationalCode, password, newPassword);
	res.json({user});
});

module.exports = router;
