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
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
      if(!inputs.nfcFriendlyName) return false;

      let birdIdConstraint;
      if(inputs.isAssigned) {
          birdIdConstraint = {
              '!=': null
          }
      } else if(inputs.isAssigned === false) {
          birdIdConstraint = null;
      }

      let query = {};

      if(birdIdConstraint) query.birdID = birdIdConstraint;
      query.nfcRFID = inputs.nfcFriendlyName;
  
      result = await RFIDTag.count(
        query
      )
  
      return (result > 0)
    }
  
  
  };
  
  