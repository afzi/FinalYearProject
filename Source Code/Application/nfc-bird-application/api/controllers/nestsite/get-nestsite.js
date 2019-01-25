module.exports = {


    friendlyName: 'List all nest sites, based on filters',
  
  
    description: 'Returns a list of Nest Site objects matching the given criteria',
  
  
    inputs: {
      nestID: {
        required: false,
        type: 'string',
        description: 'The friendly name of nest'
      },

      nestDescription: {
        required: false,
        type: 'string',
        description: 'The nest description'
      },

      distanceMetresFrom: {
        required: false,
        type: 'number',
        description: 'Distance from this nestsite to the hoppers'
      },

      distanceMetresTo: {
        required: false,
        type: 'number',
        description: 'Distance from this nestsite to the hoppers'
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
        let query = {}

        if(inputs.nestID) query.nestID = {'contains': inputs.nestID}
        if(inputs.nestDescription) query.nestDescription = {'contains': inputs.nestDescription}
        if(inputs.distanceMetresFrom) query.distanceToHoppersMetres = {'>=': inputs.distanceMetresFrom};
        if(inputs.distanceMetresTo) query.distanceToHoppersMetres = {'<=': inputs.distanceMetresTo};
        
        let finalQuery = {where: query}
        if(inputs.skip) finalQuery.skip = inputs.skip;
        if(inputs.limit) finalQuery.limit = inputs.limit;

        var result = await Nestsite.find(finalQuery);
  
        return result;
    }
  
  
  };
  
  