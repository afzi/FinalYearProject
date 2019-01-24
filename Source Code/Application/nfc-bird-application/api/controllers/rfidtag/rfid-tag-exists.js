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
  
  
    fn: async function (inputs) {
      if(!inputs.nfcFriendlyName) return false;
  
      result = await RFIDTag.count({
        nfcRFID: inputs.nfcFriendlyName
      })
  
      return (result > 0)
    }
  
  
  };
  
  