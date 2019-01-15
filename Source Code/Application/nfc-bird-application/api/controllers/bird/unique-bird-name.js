module.exports = {
    friendlyName: 'Check that the bird name is unique',
  
  
    description: 'Returns true if the bird echoName is unique',
  
  
    inputs: {
      echoName: {
        required: false,
        type: 'string',
        description: 'The echo name to test'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      if(!inputs.echoName) return exits.success(false);
  
      result = await Bird.count({
        echoName: inputs.echoName
      })
  
      return exits.success(result == 0)
    }
  };
  
  