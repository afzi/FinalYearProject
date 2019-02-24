module.exports = {
    friendlyName: 'Check that the username exists',
  
  
    description: 'Returns true if the username exists',
  
  
    inputs: {
      username: {
        required: false,
        type: 'string',
        description: 'The username to test'
      },
      excludeId: {
        required: false,
        type: 'string',
        decsiption: 'whether to exclude a user ID from this check'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      if(!inputs.username) return exits.success(false);
  
      var query = {}
      query.username = inputs.username;
      if(inputs.excludeId) query.id = {'!=': inputs.excludeId}

      result = await User.count(query);
  
      return exits.success(result > 0)
    }
  };
  
  