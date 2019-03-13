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
      },

      forbidden: {
        statusCode: 403,
        description: 'You are not allowed to take this action because you didn not create this record'
      }
  
    },
  
  
    fn: async function (inputs) {
      var deleteRfid = await RFIDTag.findOne({nfcRFID: inputs.nfcRFID})
      if(!this.req.me.hasEditFull) {
        if(deleteRfid.createdBy != this.req.me.id) {
          throw 'forbidden'
        }
      }

        await RFIDTag.destroyOne({nfcRFID: inputs.nfcRFID})
          .intercept({name: 'UsageError'}, 'invalid');

          delete deleteRfid.createdAt;
          delete deleteRfid.updatedAt;
          delete deleteRfid.createdBy;
          delete deleteRfid.updatedBy;

          await sails.helpers.logActivity(this.req.me.id, 'Deleted a RFID tag', {}, deleteRfid);
    }
  
  
 };
  
  