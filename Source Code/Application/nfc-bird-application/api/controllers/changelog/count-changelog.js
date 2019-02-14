module.exports = {

    friendlyName: 'Count Changelog',
  
  
    description: 'Count/Filter changelog.',
  
  
    extendedDescription:
  `This retrieves the number of log entries, according to filters (if given).`,
  
  
    inputs: {
  
      username: {
        required: false,
        type: 'string',
        description: 'The username'
      },

      action: {
        required: false,
        type: 'string',
        description: 'The action (or part of it)'
      },
  
      dateFrom:  {
        required: false,
        type: 'number',
        description: 'The starting date from which to filter logs',
      },

      dateTo: {
        required: false,
        type: 'string',
        description: 'The end date to which to filter logs',
      },

      data: {
        required: false,
        type: 'string',
        description: 'The data (or part of it).'
      }
  
    },
  
  
    exits: {
  
      success: {
        description: 'All good dawg.'
      }
    },
  
  
    fn: async function (inputs) {
      console.log("Received request to list/filter birds")

      let query = {}
      if(inputs.data) query.data = {'contains': inputs.data}
      if(inputs.username) query.username = inputs.username
      
      if(inputs.dateFrom) query.createdAt = {'>=': inputs.dateFrom}
      if(inputs.dateTo) query.layDate['<='] = inputs.createdAt;

      var result = await Changelog.count(query);

      return result;
    }
  
  };
  