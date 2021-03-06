module.exports = {

    friendlyName: 'count Birds',
  
  
    description: 'Return a count of birds',
  
  
    inputs: {
  
      studId: {
        required: false,
        type: 'string',
        description: 'The STUD ID (legacy)'
      },

      newStudId: {
        required: false,
        type: 'string',
        description: 'The NEW STUD ID (legacy)'
      },
  
      leftRingId:  {
        required: false,
        type: 'string',
        description: 'The left ring ID (legacy)',
      },

      rightRingId: {
        required: false,
        type: 'string',
        description: 'The left ring ID (legacy)',
      },

      birdName: {
        required: false,
        type: 'string',
        description: 'The friendly name to assign to this bird.',
        extendedDescription: 'Must be unique'
      },

      sex: {
        required: false,
        type: 'string',
        description: 'The sex (male / female / unknown)',
        extendedDescription: 'Must be one of male / female / unknown'
      },

      isBreeder: {
        required: false,
        type: 'string',
        description: 'Whether th ebird is(breeder / not breeder / unknown)'
      },

      fatherName: {
        required: false,
        type: 'string',
        description: 'The name of the father bird.'
      },

      secondFatherName: {
        required: false,
        type: 'string',
        description: 'The name of the second father bird.'
      },

      groupName: {
        required: false,
        type: 'string',
        description: 'The group to assign this bird to.'
      },

      motherName: {
        required: false,
        type: 'string',
        description: 'The name of the mother bird.'
      },

      nfcRingId: { // TODO
        required: false,
        type: 'string',
        description: 'The RFID of the NFC ring attached to this bird.'
      },

      layDateFrom: {
        required: false,
        type: 'number',
        description: 'The date this bird was laid.',
        extendedDescription: 'Must be a valid timestamp'
      },

      layDateTo: {
        required: false,
        type: 'number',
        description: 'The date this bird was laid.',
        extendedDescription: 'Must be a valid timestamp'
      },

      hatchDateFrom: {
        required: false,
        type: 'number',
        description: 'The date this bird was hatched.',
        extendedDescription: 'Must be a valid timestamp'
      },

      hatchDateTo: {
        required: false,
        type: 'number',
        description: 'The date this bird was hatched.',
        extendedDescription: 'Must be a valid timestamp'
      },

      incDaysFrom: {
        required: false,
        type: 'number',
        description: 'The number of days this bird spent in incubation.'
      },

      
      incDaysTo: {
        required: false,
        type: 'number',
        description: 'The number of days this bird spent in incubation.'
      },

      whereHatched: {
        required: false,
        type: 'string',
        description: 'The location where the bird hatched.'
      },

      whereFledged: {
        required: false,
        type: 'string',
        description: 'The location where this bird fledged.'
      },

      whenFledged: {
        required: false,
        type: 'number',
        description: 'The date when this bird fledged.',
        extendedDescription: 'Must be a valid timestamp'
      },

      whereReleased: {
        required: false,
        type: 'string',
        description: 'The location where this bird was released.'
      },

      whenReleased: {
        required: false,
        type: 'number',
        description: 'The date when this bird was released.',
        extendedDescription: 'Must be a valid timestamp'
      },

      researcherNotes: {
        required: false,
        type: 'string',
        description: 'Researcher notes.'
      },

      currentNestSite: {
        required: false,
        type: 'string',
        description: 'Where is the bird currently nesting'      },

        currentCondition: {
            required: false,
            type: 'string',
            description: 'The current condition of the bird'
        }
    },
  
  
    exits: {
  
      success: {
        description: 'All good dawg.'
      }
    },
  
  
    fn: async function (inputs) {
      console.debug("Received request to list/filter birds")

      let query = {}
      // if(inputs.studId) query.studID = {'contains': inputs.studId}
      // if(inputs.newStudId) query.newStudID = {'contains': inputs.newStudId}
      // if(inputs.leftRingId) query.leftRingID = {'contains': inputs.leftRingId}
      // if(inputs.rightRingId) query.rightRingID = {'contains': inputs.rightRingId}
      // if(inputs.birdName) query.birdName = {'contains': inputs.birdName}
      // if(inputs.sex) query.sex = inputs.sex
      // if(inputs.isBreeder) query.isBreeder = inputs.isBreeder;
      // if(inputs.fatherName) query.fatherName = {'contains': inputs.fatherName}
      // if(inputs.motherName) query.motherName = {'contains': inputs.motherName}
      // if(inputs.secondFatherName) query.secondFatherName = {'contains': inputs.secondFatherName}
      // if(inputs.groupName) query.groupName = {'contains': inputs.groupName}
      // if(inputs.researcherNotes) query.researcherNotes = {'contains': inputs.researcherNotes}
      
      // if(inputs.layDateFrom) query.layDate = {'>=': inputs.layDateFrom}
      // if(inputs.layDateTo) query.layDate['<='] = inputs.layDateTo;
      // if(inputs.hatchDateFrom) query.hatchDate = {'>=': inputs.hatchDateFrom}
      // if(inputs.hatchDateTo) query.hatchDate['<='] = inputs.hatchDateTo;
      // if(inputs.incDaysFrom) query.incubationDays = {'>=': inputs.incDaysFrom};
      // if(inputs.incDaysTo) query.incubationDays['<='] = inputs.incDaysTo;

      let finalQuery = {where: query}

      if(!inputs.currentNestSite && !inputs.currentCondition) {
        var result = await Bird.count(finalQuery);

        return result;
      } else {
        var result = await Bird.find(finalQuery);

        var finalResult = [];

        for(let nextBird of result) {
          var allConditionsMatch = true;
          
            if(inputs.currentCondition) {
              var conditionHistory = await Birdcondition.find({where: {birdID: nextBird.id}, sort: 'dateNoted DESC'});
              if(!(conditionHistory[0] && (conditionHistory[0].birdCondition === inputs.currentCondition))) {
                allConditionsMatch = false;
              }
            }
          

            if(inputs.currentNestSite && allConditionsMatch) {
              var nestsiteHistory = await Birdnest.find({where: {birdID: nextBird.id}, sort: 'dateEntered DESC'}).populate('nestID');
              if(!(nestsiteHistory[0] && (nestsiteHistory[0].nestID.nestID === inputs.currentNestSite))) {
                allConditionsMatch = false;
              }
            } 

          if(allConditionsMatch) finalResult.push(nextBird);
        }

      // TODO rewrite this whole fucking controller to be more efficient


        return finalResult.length;
        
      }
      

    }
  
  };
  