module.exports = {


    friendlyName: 'Delete rfid',
  
  
    description: 'Deletes a rfid tag',
  
  
    inputs: {
       nfcRFID: {
            required: true,
            type: 'string',
            description: 'The ID of the RFID to delete'
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
        await RFIDTag.destroyOne({nfcRFID: inputs.nfcRFID})
          .intercept({name: 'UsageError'}, 'invalid');

        
          await sails.helpers.logActivity(this.req.me.id, 'Deleted a RFID tag', inputs);
    }
  
  
 };
  
  