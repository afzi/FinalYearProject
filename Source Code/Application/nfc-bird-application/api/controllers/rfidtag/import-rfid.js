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
  
  
    fn: async function (inputs, exits) {
        let numSkipped = 0;
        let numSuccess = 0;

        for(nextValue of inputs.csv.values) {
          
            exist = await RFIDTag.count({
              nfcRFID: nextValue.short
            })

            exist += await RFIDTag.count({
              nfcRFIDInternal: nextValue.long
            })
            .intercept({name: 'UsageError'}, 'invalid');
  
            if(exist > 0) {
              numSkipped ++;
            } else {
              await RFIDTag.create({
                nfcRFID: nextValue.short,
                nfcRFIDInternal: nextValue.long,
                colour: nextValue.colour
              })
              .intercept({name: 'UsageError'}, 'invalid');

              numSuccess ++;
            }
          
        }

        await sails.helpers.logActivity(this.req.me.id, 'Imported RFID tags', {success: numSuccess, skipped: numSkipped});

        return exits.success({success: numSuccess, skipped: numSkipped});
    }
  
  
 };
  
  