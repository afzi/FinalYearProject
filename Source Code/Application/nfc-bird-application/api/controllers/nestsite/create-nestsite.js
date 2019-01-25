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
            nestDescription: inputs.nestDescription
          })
          .intercept('E_UNIQUE', 'alreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid');
        }
  
  
  // };
  
  