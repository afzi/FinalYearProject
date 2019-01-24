module.exports = {


    friendlyName: 'List all registered RFID tags, based on filters',
  
  
    description: 'Returns a list of RFID objects matching the given criteria',
  
  
    inputs: {
      nfcRingId: {
        required: false,
        type: 'string',
        description: 'The friendly name of the NFC token (or part of it)'
      },
      isAssigned: {
        required: false,
        type: 'boolean',
        description: 'Whether this token has been assigned to a bird'
      },
      nfcRFIDInternal: {
          required: false,
          type: 'string',
          description: 'The RFID GUID (or part of it)'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
        let birdIdConstraint;
        if(inputs.isAssigned) {
            birdIdConstraint = {
                '!=': null
            }
        } else if(inputs.isAssigned === false) {
            birdIdConstraint = null;
        }
  
        let query = {};

        if(birdIdConstraint) query.birdId = birdIdConstraint;
        if(inputs.nfcRingId) query.nfcRFID = {'contains': inputs.nfcRingId}
        if(inputs.nfcRFIDInternal) query.nfcRFIDInternal = {'contains': inputs.nfcRFIDInternal}

        var result = await RFIDTag.find(query);
  
        return result;
    }
  
  
  };
  
  