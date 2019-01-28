module.exports = {


    friendlyName: 'Impmort RFID',
  
  
    description: 'Imports RFID tags from a CSV file',
  
  
    inputs: {
        csv: {
            required: true,
            type: 'json',
            description: 'The CSV parsed as a JSON document'
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
        console.log("HAI");
    }
  
  
 };
  
  