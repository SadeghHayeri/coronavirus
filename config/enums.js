const enums = {
	ROLES: {
		ADMIN: 'ADMIN',
		CHIEF: 'CHIEF',
		STAFF: 'STAFF',
		FAMILY_HEAD: 'FAMILY_HEAD',
		PATIENT: 'PATIENT',
	},

	// TODO: change to real statuses
	GROUPS: {
		NO_RISK: 'NO_RISK',
		LOW_RISK: 'LOW_RISK',
		MEDIUM_RISK: 'MEDIUM_RISK',
		HIGH_RISK: 'HIGH_RISK',
	},

	STATUS: {
		NORMAL: 'NORMAL',
		SICK_AND_HOSPITALIZED: 'SICK_AND_HOSPITALIZED',
		SICK_AND_DISCHARGE: 'SICK_AND_DISCHARGE',
		CURED: 'CURED',
		DEAD: 'DEAD',
	},

	SEX: {
		MALE: 'MALE',
		FEMALE: 'FEMALE',
	}
};

module.exports = enums;