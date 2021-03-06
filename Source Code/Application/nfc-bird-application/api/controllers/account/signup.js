module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new user account.',


  extendedDescription:
`This creates a new user record in the databaseand signs in the requesting user agent
by modifying its session.`,


  inputs: {


    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    username: {
      required: true,
      type: 'string',
      description: 'The username for the new account',
      extendedDescription: 'Must be a valid username.',
    },

    password: {
      required: true,
      type: 'string',
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },
    hasRead:{
      type:"boolean"
    },
    hasCreateEdit: {
      type: "boolean"
    },
    hasEditFull: {
      type: "boolean"
    },
    hasExport: {
      type: "boolean"
    },
    // hasExportFull: {
    //   type: "boolean"
    // },
    hasAdmin: {
      type: "boolean"
    }

  },


  exits: {

    success: {
      description: 'New user account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or username are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    usernameAlreadyInUse: {
      statusCode: 409,
      description: 'The provided username is already in use.',
    },

  },


  fn: async function (inputs) {

    var newUsername = inputs.username.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newUserRecord = await User.create(_.extend({
      username: newUsername,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      hasRead: inputs.hasRead,
      hasCreateEdit: inputs.hasCreateEdit,
      hasEditFull: inputs.hasEditFull,
      hasExport: inputs.hasExport,
      hasAdmin: inputs.hasAdmin,
      isSuperAdmin: false
    }))
    .intercept('E_UNIQUE', 'usernameAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    newUserRecord.password = "<hidden>"; // do this so the password doesn't appear in the logs
    delete newUserRecord.createdAt;
    delete newUserRecord.updatedAt;
    delete newUserRecord.createdBy;
    delete newUserRecord.updatedBy;

    await sails.helpers.logActivity(this.req.me.id, 'Created new user account', newUserRecord, {});
  }

};
