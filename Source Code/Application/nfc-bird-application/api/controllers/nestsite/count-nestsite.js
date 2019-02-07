module.exports = {


    friendlyName: 'Count all nest sites, based on filters',
  
  
    description: 'Returns a count of Nest Site objects matching the given criteria',
  
  
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

        var result = await Nestsite.count(query);
  
        return result;
    }
  
  
  };
  
  