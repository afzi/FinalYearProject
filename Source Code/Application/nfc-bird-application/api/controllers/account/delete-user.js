module.exports = {


    friendlyName: 'Delete user',
  
  
    description: 'Deletes a user',
  
  
    inputs: {
       id: {
            required: true,
            type: 'string',
            description: 'The ID of the user to delete'
            },
    },
  
  
    exits: {
  
      success: {
        description: 'All done.'
      },

      invalid: {
        responseType: 'badRequest',
        description: 'The provided input is invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      }
  
    },
  
  
    fn: async function (inputs) {
      var deletedRecord = await User.destroyOne({id: inputs.id, isSuperAdmin: false})
          .intercept({name: 'UsageError'}, 'invalid');

      if(deletedRecord) {
        let inputsWrapper = inputs;
        let vm = this;
  
        this.req.sessionStore.all((error, sessions) => {
          if(sessions) {
            for (const nextSession of Object.keys(sessions)) {
              if(sessions[nextSession].userId == inputsWrapper.id) {
                vm.req.sessionStore.destroy(nextSession, () => console.log(`Destroyed session for user with ID ${inputsWrapper.id} as their details were deleted`))
              }
            }
          }
        })


        deletedRecord.password = "<hidden>";
        delete deletedRecord.createdAt;
        delete deletedRecord.updatedAt;
        delete deletedRecord.createdBy;
        delete deletedRecord.updatedBy;
        await sails.helpers.logActivity(this.req.me.id, 'Deleted user account', {}, deletedRecord);
      }
    }
  
  
 };
  
  