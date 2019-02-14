module.exports = {


    friendlyName: 'Edit user',
  
  
    description: 'Edit a user account.',
  
  
    extendedDescription:
  `This edits a user record, provided an ID and a list of fields to modify.`,
  
  
    inputs: {
      id: {
        required: true,
        type: 'number',
        description: 'The ID of the user to edit'
      },
  
      fullName:  {
        required: false,
        type: 'string',
        example: 'Frida Kahlo de Rivera',
        description: 'The user\'s full name.',
      },
  
      password: {
        required: false,
        type: 'string',
        maxLength: 200,
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
  
    },
  
  
    fn: async function (inputs) {
      var updateQuery = {};
      if(inputs.password) updateQuery.password = await sails.helpers.passwords.hashPassword(inputs.password);
      updateQuery.fullName = inputs.fullName;
      updateQuery.hasRead = inputs.hasRead;
      updateQuery.hasCreateEdit = inputs.hasCreateEdit;
      updateQuery.hasEditFull = inputs.hasEditFull;
      updateQuery.hasExport = inputs.hasExport;
      updateQuery.hasAdmin = inputs.hasAdmin;


      // Build up data for the new user record and save it to the database.
      var newUserRecord = await User.update({id: inputs.id})
          .set(updateQuery)
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

      if(inputs.password) inputs.password = "<hidden>"; // do this so the password doesn't appear in the logs
      inputs.username = newUserRecord.username;
      await sails.helpers.logActivity(this.req.me.id, 'Edited user account', inputs);
    }
  
  };
  