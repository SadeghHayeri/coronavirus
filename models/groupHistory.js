const mongoose = require('mongoose');
const { GROUPS } = require('../config/enums');

const Schema = mongoose.Schema;

const GroupHistorySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: Object.values(GROUPS),
	},
	changeAt: {
		type: Date,
		default: Date.now,
	},
	editBy: {
		type: Schema.Types.ObjectId,  // null means edited by system
	}
});

const groupHistory = mongoose.model('groupHistory', GroupHistorySchema);

module.exports = groupHistory;