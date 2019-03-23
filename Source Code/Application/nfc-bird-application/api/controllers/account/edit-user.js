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
      var oldUserRecord = await User.findOne({id: inputs.id});

      var newUserRecord = await User.updateOne({id: inputs.id})
          .set(updateQuery)
      .intercept({name: 'UsageError'}, 'invalid');

      let inputsWrapper = inputs;
      let vm = this;

      this.req.sessionStore.all((error, sessions) => {
        if(sessions) {
          for (const nextSession of Object.keys(sessions)) {
            if(sessions[nextSession].userId == inputsWrapper.id) {
              vm.req.sessionStore.destroy(nextSession, () => console.log(`Destroyed session for user with ID ${inputsWrapper.id} as their details were changed`))
            }
          }
        }
      })

      delete newUserRecord.createdAt;
      delete newUserRecord.updatedAt;
      delete newUserRecord.createdBy;
      delete newUserRecord.updatedBy;

      delete oldUserRecord.createdAt;
      delete oldUserRecord.updatedAt;
      delete oldUserRecord.createdBy;
      delete oldUserRecord.updatedBy;

      oldUserRecord.password = "<hidden>";
      newUserRecord.password = "<hidden>";
      await sails.helpers.logActivity(this.req.me.id, 'Edited user account', newUserRecord, oldUserRecord);
    }
  
  };
  