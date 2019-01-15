module.exports = {


    friendlyName: 'Validate nfc rfid',
  
  
    description: 'Returns true if the provided NFC token has been registered in the database',
  
  
    inputs: {
      nfcFriendlyName: {
        required: false,
        type: 'string',
        description: 'The friendly name of the NFC token'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      if(!inputs.nfcFriendlyName) return exits.success(false);
  
      result = await RFIDTag.count({
        RFID_Friendly_ID: inputs.nfcFriendlyName
      })
  
      return exits.success(result > 0)
    }
  
  
  };
  
  