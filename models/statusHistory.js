const mongoose = require('mongoose');
const { STATUS } = require('../config/enums');

const Schema = mongoose.Schema;

const StatusHistorySchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: Object.values(STATUS),
	},
	changeAt: {
		type: Date,
		default: Date.now,
	},
	editBy: {
		type: Schema.Types.ObjectId, // null means edited by system
	}
});

const StatusHistory = mongoose.model('statusHistory', StatusHistorySchema);

module.exports = StatusHistory;