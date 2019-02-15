module.exports = {

    friendlyName: 'Get Changelog',
  
  
    description: 'List/Filter changelog.',
  
  
    extendedDescription:
  `This retrieves log entries, according to filters (if given).`,
  
  
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

      let finalQuery = {where: query}
      if(inputs.skip) finalQuery.skip = inputs.skip;
      if(inputs.limit) finalQuery.limit = inputs.limit;
      finalQuery.sort = 'createdAt DESC';

      var result = await Changelog.find(finalQuery).populate('user');

      return result;
    }
  
  };
  