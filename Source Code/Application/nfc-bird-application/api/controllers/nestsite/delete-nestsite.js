module.exports = {


    friendlyName: 'Delete nestsite',
  
  
    description: 'Deletes a nestsite',
  
  
    inputs: {
       id: {
            required: true,
            type: 'string',
            description: 'The ID of the nestsite to delete'
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
      },
  
      alreadyInUse: {
        statusCode: 409,
        description: 'One or more of the provided fields are already in use.'
      }
  
    },
  
  
    fn: async function (inputs) {
        var deletedRecord = await Nestsite.destroyOne({id: inputs.id})
          .intercept({name: 'UsageError'}, 'invalid');

          inputs.nestID = deletedRecord.nestID;
          
        await sails.helpers.logActivity(this.req.me.id, 'Deleted a nestsite', inputs);
    }
  
  
 };
  
  