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

      distanceKmFrom: {
        required: false,
        type: 'number',
        description: 'Distance from this nestsite to the hoppers'
      },

      distanceKmTo: {
        required: false,
        type: 'number',
        description: 'Distance from this nestsite to the hoppers'
      },

      includeBirds: {
        required: false,
        type: 'boolean',
        description: 'Do we want to include the current and previous bird occupants'
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
        defaultsTo: 'nestID',
        description: 'Which field to sort by'
      },

      sortDirection: {
        required: false,
        type: 'string',
        defaultsTo: 'ASC',
        description: 'Which direction to sort in (ASC/DESC)'
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
        if(inputs.distanceKmFrom) query.distanceToHoppersKm = {'>=': inputs.distanceKmFrom};
        if(inputs.distanceKmTo) query.distanceToHoppersKm = {'<=': inputs.distanceKmTo};
        
        let finalQuery = {where: query}
        if(inputs.skip) finalQuery.skip = inputs.skip;
        if(inputs.limit) finalQuery.limit = inputs.limit;
        finalQuery.sort = `${inputs.sortItem} ${inputs.sortDirection}`

        var result = await Nestsite.find(finalQuery).populate('createdBy');

        if(inputs.includeBirds) {
          for(nextNestsite of result) {
            var birds = await Birdnest.find(
              {
                where: {
                  nestID: nextNestsite.id,
                  dateLeft: null
                },
                sort: 'dateEntered DESC'
              }
            ).populate('birdID');

            let maleBirds = [];
            let femaleBirds = [];
            if(birds) {
              birds.forEach(nextBird => {
                if(nextBird.birdID.sex == 'male') {
                  maleBirds.push(nextBird.birdID);
                } else {
                  femaleBirds.push(nextBird.birdID);
                }
              })

              nextNestsite.maleBirds = maleBirds;
              nextNestsite.femaleBirds = femaleBirds;
            }
          }
      }
  
        return result;
    }
  
  
  };
  
  