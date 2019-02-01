module.exports = {
    friendlyName: 'Check that the nestsite name exists',
  
  
    description: 'Returns true if the nestID exists',
  
  
    inputs: {
      nestID: {
        required: false,
        type: 'string',
        description: 'The nestID to test'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs, exits) {
      if(!inputs.nestID) return exits.success(false);
  
      result = await Nestsite.count({
        nestID: inputs.nestID
      })
  
      return exits.success(result > 0)
    }
  };
  
  