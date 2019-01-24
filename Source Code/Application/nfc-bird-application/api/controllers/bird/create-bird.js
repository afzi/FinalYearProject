module.exports = {


    friendlyName: 'Register New Bird',
  
  
    description: 'Register a new bird.',
  
  
    extendedDescription:
  `This creates a new bird record in the database.`,
  
  
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

      echoName: {
        required: true,
        type: 'string',
        description: 'The friendly name to assign to this bird.',
        extendedDescription: 'Must be unique'
      },

      sex: {
        required: true,
        type: 'string',
        description: 'The sex (male / female / unknown)',
        extendedDescription: 'Must be one of MALE / FEMALE / UNKNOWN'
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

      nfcRingId: {
        required: true,
        type: 'string',
        description: 'The RFID of the NFC ring attached to this bird.'
      },

      layDate: {
        required: false,
        type: 'number',
        description: 'The date this bird was laid.',
        extendedDescription: 'Must be a valid timestamp'
      },

      hatchDate: {
        required: false,
        type: 'number',
        description: 'The date this bird was hatched.',
        extendedDescription: 'Must be a valid timestamp'
      },

      incDays: {
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

      notes: {
        required: false,
        type: 'string',
        description: 'Researcher notes.'
      },

      currentNestSite: {
        required: false,
        type: 'string',
        description: 'Where is the bird currently nesting'      }
  
    },
  
  
    exits: {
  
      success: {
        description: 'New bird record was created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided input is invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
      alreadyInUse: {
        statusCode: 409,
        description: 'One or more of the provided fields are already in use.',
      }
    },
  
  
    fn: async function (inputs) {
      console.log("Received request to register bird")

      // Build up data for the new bird record and save it to the database.
      await Bird.create({
        birdName: inputs.echoName,
        nfcRfid: inputs.nfcRingId,
        createdBy: this.req.session.userId,
        editedBy: this.req.session.userId,
        studID: inputs.studId,
        newStudID: inputs.newStudId,
        leftRingID: inputs.leftRingId,
        rightRingID: inputs.rightRingId,
        sex: inputs.sex,
        motherName: inputs.motherName,
        fatherName: inputs.fatherName,
        secondFatherName: inputs.secondFatherName,
        researcherNotes: inputs.notes,
        layDate: inputs.layDate,
        hatchDate: inputs.hatchDate,
        incubationDays: inputs.incDays,
        whereHatched: inputs.whereHatched,
        whereFledged: inputs.whereFledged,
        whenFledged: inputs.whenFledged,
        whereReleased: inputs.whereReleased,
        whenReleased: inputs.whenReleased,
        groupName: inputs.groupName,
        currentNestSite: inputs.currentNestSite
      })
      // .intercept('E_UNIQUE', 'alreadyInUse') UNCOMMENT THE INTERCEPTS WHEN DONE WITH DEBUGGING
      // .intercept({name: 'UsageError'}, 'invalid');
    }
  
  };
  