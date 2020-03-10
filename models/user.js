const mongoose = require('mongoose');
const { ROLES, STATUS } = require('../config/enums');
const { SALT_ROUND } = require('../config/tokens');

const bcrypt = require('bcrypt');

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
		default: '',
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
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	needResetPassword: {
		type: Boolean,
		default: true,
	}
});



UserSchema.pre('save', async function() {
	const user = this;

	if (!user.isModified('password'))
		return;

	const hashedPassword = await bcrypt.hash(user.password, SALT_ROUND);
	user.password = hashedPassword;
});

UserSchema.methods.comparePassword = async function(password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;