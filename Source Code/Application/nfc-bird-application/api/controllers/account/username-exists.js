module.exports = {
    friendlyName: 'Check that the username exists',
  
  
    description: 'Returns true if the username exists',
  
  
    inputs: {
      username: {
        required: false,
        type: 'string',
        description: 'The username to test'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      if(!inputs.username) return exits.success(false);
  
      result = await User.count({
        username: inputs.username
      })
  
      return exits.success(result > 0)
    }
  };
  
  