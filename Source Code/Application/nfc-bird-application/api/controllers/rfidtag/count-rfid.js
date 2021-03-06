module.exports = {


    friendlyName: 'Count all registered RFID tags, based on filters',
  
  
    description: 'Returns a count of RFID objects matching the given criteria',
  
  
    inputs: {
      nfcRFID: {
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
      },
      colour: {
        required: false,
        type: 'string',
        description: 'The colour (or part of it)'
    },

      skip: {
          required: false,
          type: 'number',
          description: 'How many records to skip (if used in pagination - where does the page begin)'
      },

      limit: {
          required: false,
          type: 'number',
          description: 'How many records to return (if used in pagination - what is the page size)'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
        var numRfids = await RFIDTag.count();

        // let birdIdConstraint;
        // if(inputs.isAssigned) {
        //     birdIdConstraint = {
        //         '!=': null
        //     }
        // } else if(inputs.isAssigned === false) {
        //     birdIdConstraint = null;
        // }
  
        let query = {};

        // if(birdIdConstraint) query.birdId = birdIdConstraint;
        // if(inputs.nfcRFID) query.nfcRFID = {'contains': inputs.nfcRFID}
        // if(inputs.nfcRFIDInternal) query.nfcRFIDInternal = {'contains': inputs.nfcRFIDInternal}
        // if(inputs.colour) query.colour = {'contains': inputs.colour}
        
        let finalQuery = {where: query}

        var result = await RFIDTag.count(finalQuery);
        result.rfidCount = numRfids;
  
        return result;
    }
  
  
  };
  
  