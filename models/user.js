const mongoose = require('mongoose');
const { ROLES, STATUS, GROUPS, SEX } = require('../config/enums');
const { SALT_ROUND } = require('../config/tokens');

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


/**
 * @api {OBJECT} User User
 * @apiGroup models
 * @apiParam {Number} id
 * @apiParam {String="ADMIN", "CHIEF", "STAFF", "FAMILY_HEAD", "PATIENT"} role
 * @apiParam {String} nationalCode
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} password
 * @apiParam {Number} birthDate timestamp
 * @apiParam {String="MALE", "FEMALE"} sex
 * @apiParam {String="NORMAL", "SICK_AND_HOSPITALIZED", "SICK_AND_DISCHARGE", "CURED", "DEAD"} status
 * @apiParam {String="NO_RISK", "LOW_RISK", "MEDIUM_RISK", "HIGH_RISK"} group
 * @apiParam {String} registrar userId
 * @apiParam {String} parent userId
 * @apiParam {Boolean} isActive
 * @apiParam {Boolean} needResetPassword
 */

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
		type: Number,
	},
	sex: {
		type: String,
		enum: Object.values(SEX),
		required: true,
	},
	status: {
		type: String,
		enum: Object.values(STATUS),
		default: STATUS.NORMAL,
	},
	group: {
		type: String,
		enum: Object.values(GROUPS),
		default: GROUPS.NO_RISK,
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