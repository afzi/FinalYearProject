module.exports = {

    friendlyName: 'Get Full Birds',
  
  
    description: 'List/Filter all fields birds.',
  
  
    extendedDescription:
  `This lists birds, according to filters (if given).`,
  
  
    inputs: {
      id: {
        required: false,
        type: 'string',
        description: 'ID of the bird to retrieve'
      },

      birdName: {
        required: false,
          type: 'boolean'
      },

      groupName: {
        required: false,
        type: 'boolean'
      },

      layDate:{
        required: false,
        type: 'boolean'
      },

      status: {
        required: false,
        type: 'boolean'

      },

      sex: {
        required: false,
        type: 'boolean'

      },

      hatchDate: {
        required: false,
        type: 'boolean'
      },

      deathDate: {
        required: false,
        type: 'boolean'
      },

      currentCondition: {
        required: false,
        type: 'boolean'
      },

      incubationDays: {
        required: false,
        type: 'boolean'
      },

      lastSeenDate: {
        required: false,
        type: 'boolean'
      },

      motherName: {
        required: false,
        type: 'boolean'
      },

      laidWhere: {
        required: false,
        type: 'boolean'
      },

      currentNestSite: {
        required: false,
        type: 'boolean'
      },

      motherStudID: {
        required: false,
        type: 'boolean'
      },

      whereFledged: {
        required: false,
        type: 'boolean'
      },

      birdID: {
        required: false,
        type: 'boolean'
      },
    
      fatherName: {
        required: false,
        type: 'boolean'
      },

      whereReleased: {
        required: false,
        type: 'boolean'
      },

      studId: {
        required: false,
        type: 'boolean'
      },

      fatherStudID: {
        required: false,
        type: 'boolean'
      },

      whenReleased: {
        required: false,
        type: 'boolean'
      },

      newStudId: {
        required: false,
        type: 'boolean'
      },

      secondFatherName: {
        required: false,
        type: 'boolean'
      },

      birdName: {
        required: false,
        type: 'boolean'
      },

      rightRingId: {
        required: false,
        type: 'boolean'
      },

      secondFatherStudID: {
        required: false,
        type: 'boolean'
      },

      researcherNotes: {
        required: false,
        type: 'boolean'
      },

      leftRingId: {
        required: false,
        type: 'boolean'
      },

      createdOn: {
        required: false,
        type: 'boolean'
      },

      createdBy: {
        required: false,
        type: 'boolean'
      },

      DistanceToHopper: {
        required: false,
        type: 'boolean'
      },
  
    },
  
  
    exits: {
  
      success: {
        description: 'All good dawg.'
      }
    },
  
  
    fn: async function (inputs) {
      console.log("Received request to list/filter birds")

      let query = {}
      if(inputs.id) query.id = inputs.id;
      if(inputs.studId) query.studID = {'contains': inputs.studId}
      if(inputs.newStudId) query.newStudID = {'contains': inputs.newStudId}
      if(inputs.leftRingId) query.leftRingID = {'contains': inputs.leftRingId}
      if(inputs.rightRingId) query.rightRingID = {'contains': inputs.rightRingId}
      if(inputs.birdName) query.birdName = {'contains': inputs.birdName}
      if(inputs.sex) query.sex = inputs.sex
      // if(inputs.isBreeder) query.isBreeder = inputs.isBreeder;
      
      if(inputs.fatherName) query.fatherName = {'contains': inputs.fatherName}
      if(inputs.motherName) query.motherName = {'contains': inputs.motherName}
      if(inputs.secondFatherName) query.secondFatherName = {'contains': inputs.secondFatherName}
      if(inputs.groupName) query.groupName = {'contains': inputs.groupName}
      if(inputs.researcherNotes) query.researcherNotes = {'contains': inputs.researcherNotes}
      
      if(inputs.layDateFrom) query.layDate = {'>=': inputs.layDateFrom}
      if(inputs.layDateTo) query.layDate['<='] = inputs.layDateTo;
      if(inputs.hatchDateFrom) query.hatchDate = {'>=': inputs.hatchDateFrom}
      if(inputs.hatchDateTo) query.hatchDate['<='] = inputs.hatchDateTo;
      if(inputs.incDaysFrom) query.incubationDays = {'>=': inputs.incDaysFrom};
      if(inputs.incDaysTo) query.incubationDays['<='] = inputs.incDaysTo;

      if(inputs.isBreeder) query.isBreeder = inputs.isBreeder;


    let finalQuery = {where: query}

        var result = await User.find(finalQuery);
  
        return result;
    }
  
  };
  