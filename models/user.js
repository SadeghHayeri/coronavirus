const mongoose = require('mongoose');
const { ROLES, STATUS } = require('../config/enums');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	role: {
		type: String,
		enum: Object.values(ROLES),
		required: true,
	},
	nationalCode: {
		type: String,
		required: true,
		trim: true
	},
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
	},
	birthDate: {
		type: Date,
	},
	sex: {
		type: String,
		enum: ['male', 'female'],
		required: true,
	},
	status: {
		type: String,
		enum: Object.values(STATUS),
		default: STATUS.NORMAL,
	},
	registrar: {
		type: Schema.Types.ObjectId,
		default: this,
	},
	parent: {
		type: Schema.Types.ObjectId,
		default: this,
	}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;