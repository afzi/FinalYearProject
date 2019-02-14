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
      var deletedRecord = await User.destroy({id: inputs.id})
          .intercept({name: 'UsageError'}, 'invalid')
          .fetch();

        inputs.username = deletedRecord.username;
        await sails.helpers.logActivity(this.req.me.id, 'Deleted user account', inputs);
    }
  
  
 };
  
  