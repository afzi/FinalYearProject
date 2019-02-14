module.exports = {


    friendlyName: 'Edit nestsite',
  
  
    description: 'Edits a nestsite',
  
  
    inputs: {
       id: {
            required: true,
            type: 'string',
            description: 'The ID of the nestsite to edit'
            },

      nestID: {
        required: true,
        type: 'string',
        description: 'The friendly name of nest'
      },

      nestDescription: {
        required: false,
        type: 'string',
        description: 'The nest description'
      },

      distanceToHoppersKm: {
        required: false,
        type: 'number',
        description: 'Distance to the hoppers, in km'
      }
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
        await Nestsite.update({id: inputs.id})
        .set({
            nestID: inputs.nestID,
            nestDescription: inputs.nestDescription,
            distanceToHoppersKm: inputs.distanceToHoppersKm,
            createdBy: this.req.session.userId,
            editedBy: this.req.session.userId
          })
          .intercept('E_UNIQUE', 'alreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid');

          
          await sails.helpers.logActivity(this.req.me.id, 'Edited a nestsite', inputs);
        }

  
  
 };
  
  