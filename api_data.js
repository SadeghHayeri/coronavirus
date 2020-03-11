define({ "api": [
  {
    "type": "post",
    "url": "/authenticate",
    "title": "Login",
    "name": "Authentication",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nationalCode",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.token",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "-.user",
            "description": "<p>user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/authenticate/index.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "put",
    "url": "/authenticate",
    "title": "ResetPassword",
    "name": "ResetPassord",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nationalCode",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "-",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.token",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "-.user",
            "description": "<p>user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/authenticate/index.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create new user",
    "name": "CreateUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get all users",
    "name": "GetAllUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "users",
            "description": "<p>list of users</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id/groupHistory",
    "title": "Get user group history",
    "name": "GetGroupHistory",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "GroupHistory",
            "optional": false,
            "field": "groupHistory",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id/statusHistory",
    "title": "Get user status history",
    "name": "GetStatusHistory",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "StatusHistory",
            "optional": false,
            "field": "statusHistory",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users/index.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/:id",
    "title": "Update user",
    "name": "UpdateUser",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users/index.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Get specific user",
    "name": "getUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/users/index.js",
    "groupTitle": "User"
  },
  {
    "type": "OBJECT",
    "url": "GroupHistory",
    "title": "GroupHistory",
    "group": "models",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"NO_RISK\"",
              "\"LOW_RISK\"",
              "\"MEDIUM_RISK\"",
              "\"HIGH_RISK\""
            ],
            "optional": false,
            "field": "group",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "changeAt",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editBy",
            "description": "<p>userId (null means edited by system)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "models/groupHistory.js",
    "groupTitle": "models",
    "name": "ObjectGrouphistory"
  },
  {
    "type": "OBJECT",
    "url": "StatusHistory",
    "title": "StatusHistory",
    "group": "models",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"NORMAL\"",
              "\"SICK_AND_HOSPITALIZED\"",
              "\"SICK_AND_DISCHARGE\"",
              "\"CURED\"",
              "\"DEAD\""
            ],
            "optional": false,
            "field": "status",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "changeAt",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "editBy",
            "description": "<p>userId (null means edited by system)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "models/statusHistory.js",
    "groupTitle": "models",
    "name": "ObjectStatushistory"
  },
  {
    "type": "OBJECT",
    "url": "User",
    "title": "User",
    "group": "models",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"ADMIN\"",
              "\"CHIEF\"",
              "\"STAFF\"",
              "\"FAMILY_HEAD\"",
              "\"PATIENT\""
            ],
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nationalCode",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "birthDate",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"MALE\"",
              "\"FEMALE\""
            ],
            "optional": false,
            "field": "sex",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"NORMAL\"",
              "\"SICK_AND_HOSPITALIZED\"",
              "\"SICK_AND_DISCHARGE\"",
              "\"CURED\"",
              "\"DEAD\""
            ],
            "optional": false,
            "field": "status",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"NO_RISK\"",
              "\"LOW_RISK\"",
              "\"MEDIUM_RISK\"",
              "\"HIGH_RISK\""
            ],
            "optional": false,
            "field": "group",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrar",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>userId</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isActive",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "needResetPassword",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "models/user.js",
    "groupTitle": "models",
    "name": "ObjectUser"
  }
] });
