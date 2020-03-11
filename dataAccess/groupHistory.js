const groupHistory = require('../models/groupHistory');

async function logChangeGroupHistory(editorId, userId, group) {
	const groupHistory = new groupHistory({
		user: userId,
		editBy: editorId,
		group,
	});
	await groupHistory.save();
}

async function getUserChangeGroupHistory(userId) {
	return groupHistory.find({user: userId}).sort('changeAt');
}

module.exports = {
	logChangeGroupHistory,
	getUserChangeGroupHistory,
};
