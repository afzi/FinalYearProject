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
        description: 'Where is the bird currently nesting'
      },

      currentNestSiteSince: {
        required: false,
        type: 'number',
        description: 'How long has this bird been in its current nest-site'
      }
  
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

      // todo validate RFID exists before creating bird record

      // Build up data for the new bird record and save it to the database.


      
      await sails.getDatastore().transaction(async db => {
        let bird = await Bird.create({
          birdName: inputs.echoName,
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
          hatchDate: inputs.hatchDate || null,
          incubationDays: inputs.incDays,
          hatchedWhere: inputs.whereHatched,
          whereFledged: inputs.whereFledged,
          fledgeDate: inputs.whenFledged || null,
          releasedWhere: inputs.whereReleased,
          releasedWhen: inputs.whenReleased || null,
          groupName: inputs.groupName
        })
        .usingConnection(db)
        .fetch();

      if(inputs.nfcRingId) {
        await RFIDTag.update({
          nfcRFID: inputs.nfcRingId
        }).set({
          birdID: bird.id
        })
        .usingConnection(db)
      }


      if(inputs.currentNestSite) {
        var nestId = await Nestsite.findOne({nestID: inputs.currentNestSite})
        .usingConnection(db)
        .id;

        await Birdnest.create({
          birdID: bird.id,
          nestID: nestId,
          dateEntered: inputs.currentNestSiteSince || new Date()
        })
        .usingConnection(db);
      }

      })
      .intercept('E_UNIQUE', 'alreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')

    }
  };
  