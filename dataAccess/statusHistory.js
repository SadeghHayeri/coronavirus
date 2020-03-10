const StatusHistory = require('../models/statusHistory');

async function logChangeStatusHistory(editorId, userId, status) {
	const statusHistory = new StatusHistory({
		user: userId,
		editBy: editorId,
		status,
	});
	await statusHistory.save();
}

async function getUserChangeStatusHistory(userId) {
	return StatusHistory.find({user: userId}).sort('changeAt');
}

module.exports = {
	logChangeStatusHistory,
	getUserChangeStatusHistory,
};
