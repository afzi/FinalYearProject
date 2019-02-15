module.exports = {


    friendlyName: 'Create nestsite',
  
  
    description: 'Creates a nestsite',
  
  
    inputs: {
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
      },

      longitude: {
        required: false,
        type: 'number',
        description: 'The longitude'
      },
  
      latitude: {
        required: false,
        type: 'number',
        description: 'The latitude'
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
        await Nestsite.create({
            nestID: inputs.nestID,
            nestDescription: inputs.nestDescription,
            distanceToHoppersKm: inputs.distanceToHoppersKm,
            createdBy: this.req.session.userId,
            editedBy: this.req.session.userId,
            latitude: inputs.latitude,
            longitude: inputs.longitude
          })
          .intercept('E_UNIQUE', 'alreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid');

          
          await sails.helpers.logActivity(this.req.me.id, 'Created new nestsite', inputs);
        }
 };
  
  