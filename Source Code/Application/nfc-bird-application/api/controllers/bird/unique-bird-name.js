module.exports = {
    friendlyName: 'Check that the bird name is unique',
  
  
    description: 'Returns true if the bird echoName is unique',
  
  
    inputs: {
      echoName: {
        required: false,
        type: 'string',
        description: 'The echo name to test'
      },

      excludeId: {
        required: false,
        type: 'string',
        description: 'ID to exclude - useful if we are changing the name on an existing bird'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      if(!inputs.echoName) return exits.success(false);

      let query = {}
      query.birdName = inputs.echoName;
      if(inputs.excludeId) {
        query.id = {'!=': inputs.excludeId}
      }
  
      var result = await Bird.count(query);
  
      return exits.success(result == 0)
    }
  };
  
  