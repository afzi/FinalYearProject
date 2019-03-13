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
      },

      forbidden: {
        statusCode: 403,
        description: 'You are not allowed to take this action'
      }
  
    },
  
  
    fn: async function (inputs) {
      var deleteNestsite = await Nestsite.findOne({id: inputs.id})
      if(!this.req.me.hasEditFull) {

        if(deleteNestsite.createdBy != this.req.me.id) {
          throw 'forbidden'
        }
      }

        var deletedRecord = await Nestsite.destroyOne({id: inputs.id})
          .intercept({name: 'UsageError'}, 'invalid');

          inputs.nestID = deletedRecord.nestID;

          delete deleteNestsite.createdAt;
          delete deleteNestsite.updatedAt;
          delete deleteNestsite.createdBy;
          delete deleteNestsite.updatedBy;
          
        await sails.helpers.logActivity(this.req.me.id, 'Deleted a nestsite', {}, deleteNestsite);
    }
  
  
 };
  
  