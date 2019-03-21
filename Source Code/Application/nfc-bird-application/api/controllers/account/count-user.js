module.exports = {


    friendlyName: 'Count all registered users, based on filters',
  
  
    description: 'Returns a count of users matching the given criteria',
  
  
    inputs: {
      username: {
        required: false,
        type: 'string',
        description: 'The username (or part of it)'
      },
      fullName: {
        required: false,
        type: 'string',
        description: 'The full name (or part of it)'
      },
      hasRead: {
          required: false,
          type: 'boolean',
          description: 'Can this guy read?'
      },
      hasCreateEdit: {
        required: false,
        type: 'boolean',
        description: 'Can this guy create and edit?'
    },
    hasExport: {
        required: false,
        type: 'boolean',
        description: 'Can this guy export?'
    },
    hasEditFull: {
        required: false,
        type: 'boolean',
        description: 'Can this guy edit big time?'
    },
    hasAdmin: {
        required: false,
        type: 'boolean',
        description: 'Can this guy admin?'
    }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
        let query = {};

        // if(inputs.fullName) query.fullName = {'contains': inputs.fullName}

        var result = await User.count(query);
  
        return result;
    }
  
  
  };
  
  