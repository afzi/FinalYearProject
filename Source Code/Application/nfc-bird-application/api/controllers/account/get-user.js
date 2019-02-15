module.exports = {


    friendlyName: 'List all registered users, based on filters',
  
  
    description: 'Returns a list of users matching the given criteria',
  
  
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
        let query = {};

        if(inputs.fullName) query.fullName = {'contains': inputs.fullName}
        if(inputs.username) query.username = {'contains': inputs.username}
        
        let finalQuery = {where: query}
        if(inputs.skip) finalQuery.skip = inputs.skip;
        if(inputs.limit) finalQuery.limit = inputs.limit;

        var result = await User.find(finalQuery);
  
        return result;
    }
  
  
  };
  
  