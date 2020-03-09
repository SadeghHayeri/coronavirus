const mongoose = require('mongoose');
const { ROLES } = require('../config/enums');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: Object.values(ROLES),
	},
});

const User = mongoose.model('user', UserSchema);

module.exports = User;