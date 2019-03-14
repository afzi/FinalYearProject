module.exports = {

    friendlyName: 'Get Changelog',


    description: 'List/Filter changelog.',


    extendedDescription: `This retrieves log entries, according to filters (if given).`,


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

        dateFrom: {
            required: false,
            type: 'number',
            description: 'The starting date from which to filter logs',
        },

        dateTo: {
            required: false,
            type: 'string',
            description: 'The end date to which to filter logs',
        },

        newData: {
            required: false,
            type: 'string',
            description: 'The data (or part of it).'
        },
        oldData: {
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
        },

        sortItem: {
          required: false,
          type: 'string',
          defaultsTo: 'createdAt',
          description: 'Which field to sort by'
        },
  
        sortDirection: {
          required: false,
          type: 'string',
          defaultsTo: 'DESC',
          description: 'Which direction to sort in (ASC/DESC)'
        }

    },


    exits: {

        success: {
            description: 'All good dawg.'
        }
    },


    fn: async function(inputs) {
        console.log("Received request to list/filter changelog")

        let query = {}
        if (inputs.newData) {
            query.newData = { 'contains': inputs.newData }
        }
        if (inputs.oldData) {
            query.oldData = { 'contains': inputs.oldData }
        }
        if (inputs.action) query.action = { 'contains': inputs.action }

        if (inputs.dateFrom) query.createdAt = { '>=': inputs.dateFrom }
        if (inputs.dateTo) query.createdAt['<='] = inputs.dateTo;

        let finalQuery = { where: query }
        finalQuery.sort = `${inputs.sortItem} ${inputs.sortDirection}`

        var result = await Changelog.find(finalQuery).populate('user');

        var finalResult = [];

        if (inputs.username) {
            finalResult = result.filter(nextResult => nextResult.user.username === inputs.username);
        } else {
            finalResult = result;
        }

        if(inputs.skip) {
            finalResult = finalResult.slice(inputs.skip);
        }
  
        if(inputs.limit) {
          finalResult = finalResult.slice(0, inputs.limit);
        }

      // TODO rewrite this whole fucking controller to be more efficient


        return finalResult;
    }

};