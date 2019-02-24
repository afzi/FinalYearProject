module.exports = {


    friendlyName: 'Validate nfc rfid',
  
  
    description: 'Returns true if the provided NFC token has been registered in the database',
  
  
    inputs: {
      nfcFriendlyName: {
        required: false,
        type: 'string',
        description: 'The friendly name of the NFC token'
      },

      assignedStatus: {
        required: false,
        type: 'boolean',
        description: 'Whether this tag has been assigned to a bird'
      },

      excludeBirdId: {
        required: false,
        type: 'string',
        description: "If we're filtering on assigned = false, exclude this bird ID"
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
      if(!inputs.nfcFriendlyName) return false;

      let query = {}

      if(inputs.assignedStatus) {
        query.birdID = {
            '!=': null
        }
        query.nfcRFID = inputs.nfcFriendlyName;

      } else if(inputs.assignedStatus === false) {
        if(inputs.excludeBirdId) {
          query = {
            or: [
              {
                birdID: null,
                nfcRFID: inputs.nfcFriendlyName
              },
              {
                birdID: inputs.excludeBirdId,
                nfcRFID: inputs.nfcFriendlyName
              }
            ]
          }
        } else {
          query.birdID = null,
          query.nfcRFID = inputs.nfcFriendlyName
        }
      }
  
      result = await RFIDTag.count(
        query
      )
  
      return (result > 0)
    }
  
  
  };
  
  