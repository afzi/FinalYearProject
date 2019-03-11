module.exports = {


    friendlyName: 'Edit a Bird',
  
  
    description: 'Edit a bird.',
  
  
    extendedDescription:
  `This edits a bird record in the database.`,
  
  
    inputs: {
      id: {
        required: true,
        type: 'string',
        description: "The ID of the bird we're editing"
      },
  
      studID: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The STUD ID (legacy)'
      },

      newStudID: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The NEW STUD ID (legacy)'
      },
  
      leftRingID:  {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The left ring ID (legacy)',
      },

      rightRingID: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The left ring ID (legacy)',
      },

      birdName: {
        required: true,
        type: 'string',
        description: 'The friendly name to assign to this bird.',
        extendedDescription: 'Must be unique'
      },

      sex: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The sex (male / female / unknown)',
        extendedDescription: 'Must be one of MALE / FEMALE / UNKNOWN'
      },

      status: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The status (alive / dead / unknown)',
        extendedDescription: 'Must be one of ALIVE / DEAD / UNKNOWN'
      },

      isBreeder: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'Is this guy a breeder (yes / no / unknown)',
        extendedDescription: 'Must be one of YES / NO / UNKNOWN'
      },

      fatherName: {
        required: false,
        type: 'string',
        allowNull: true,
        description: 'The name of the father bird.'
      },

      fatherStudID: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The stud ID of the father bird.'
      },

      secondFatherName: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The name of the second father bird.'
      },

      secondFatherStudID: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The stud ID of the second father bird.'
      },

      groupName: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The group to assign this bird to.'
      },

      motherName: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The name of the mother bird.'
      },

      motherStudID: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The Stud ID of the mother bird.'
      },

      nfcRingID: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The RFID of the NFC ring attached to this bird.'
      },

      laidWhere: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The nestsite this bird was laid in.',
        extendedDescription: 'Must be a valid Nestsite'
      },

      layDate: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'The date this bird was laid.',
        extendedDescription: 'Must be a valid timestamp'
      },

      hatchDate: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'The date this bird was hatched.',
        extendedDescription: 'Must be a valid timestamp'
      },

      incubationDays: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'The number of days this bird spent in incubation.'
      },

      hatchedWhere: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The location where the bird hatched.'
      },

      fledgedWhere: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The location where this bird fledged.'
      },

      fledgeDate: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'The date when this bird fledged.',
        extendedDescription: 'Must be a valid timestamp'
      },

      releasedWhere: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'The location where this bird was released.'
      },

      releasedWhen: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'The date when this bird was released.',
        extendedDescription: 'Must be a valid timestamp'
      },

      researcherNotes: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'Researcher notes.'
      },

      newBreedingSite: {
        required: false,
        allowNull: true,
        type: 'string',
        description: 'Where is the bird currently nesting'
      },

      newBreedingSiteDate: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'How long has this bird been in its current nest-site'
      },

      newCondition: {
        required: false,
        allowNull: true,
        type: 'string',
        description: "What is the bird's new condition"
      },

      newConditionDate: {
        required: false,
        allowNull: true,
        type: 'number',
        description: 'When was this new condition observed'
      },
  
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
      },

      forbidden: {
        statusCode: 403,
        description: 'You are not allowed to take this action'
      }
    },
  
  
    fn: async function (inputs) {
      console.log("Received request to edit bird")

      if(!this.req.me.hasEditFull) {
        var editBird = await Bird.findOne({id: inputs.id})

        if(editBird.createdBy != this.req.me.id) {
          throw 'forbidden'
        }
      }

      // Build up data for the new bird record and save it to the database.

      await sails.getDatastore().transaction(async db => {
        var laidWhereNestsite = null;
        if(inputs.laidWhere) laidWhereNestsite = (await Nestsite.findOne({nestID: inputs.laidWhere}).usingConnection(db)).id;

        var releasedWhereNestsite = null;
        if(inputs.releasedWhere) releasedWhereNestsite = (await Nestsite.findOne({nestID: inputs.releasedWhere}).usingConnection(db)).id;

        var hatchedWhereNestsite = null;
        if(inputs.hatchedWhere) hatchedWhereNestsite = (await Nestsite.findOne({nestID: inputs.hatchedWhere}).usingConnection(db)).id;

        var fledgedWhereNestsite = null;
        if(inputs.fledgedWhere) fledgedWhereNestsite = (await Nestsite.findOne({nestID: inputs.fledgedWhere}).usingConnection(db)).id;

        let bird = await Bird.update({id: inputs.id}).set({
          birdName: inputs.birdName,
          editedBy: this.req.session.userId,
          studID: inputs.studID,
          newStudID: inputs.newStudID,
          leftRingID: inputs.leftRingID,
          rightRingID: inputs.rightRingID,
          sex: inputs.sex,
          motherName: inputs.motherName,
          fatherName: inputs.fatherName,
          secondFatherName: inputs.secondFatherName,
          motherStudID: inputs.motherStudID,
          fatherStudID: inputs.fatherStudID,
          secondFatherStudID: inputs.secondFatherStudID,
          researcherNotes: inputs.researcherNotes,
          laidWhere: laidWhereNestsite,
          layDate: inputs.layDate || null,
          hatchDate: inputs.hatchDate || null,
          incubationDays: inputs.incubationDays,
          hatchedWhere: hatchedWhereNestsite,
          fledgedWhere: fledgedWhereNestsite,
          fledgeDate: inputs.fledgeDate || null,
          releasedWhere: releasedWhereNestsite,
          releasedWhen: inputs.releasedWhen || null,
          groupName: inputs.groupName,
          status: inputs.status
        })
        .usingConnection(db)
        .fetch();

      if(inputs.nfcRingID) {
        await RFIDTag.update({
          nfcRFID: inputs.nfcRingID
        }).set({
          birdID: inputs.id
        })
        .usingConnection(db)
      }


      if(inputs.newBreedingSite) {
        let nest = await Nestsite.findOne({nestID: inputs.newBreedingSite})
        .usingConnection(db);

        let nestId = nest.id;

        let newNest = await Birdnest.create({
          birdID: inputs.id,
          nestID: nestId,
          dateEntered: inputs.newBreedingSiteDate || new Date().getTime()
        })
        .usingConnection(db)
        .fetch();

        var previousNestsite = await Birdnest.findOne({where: {birdID: bird.id}, sort: 'dateEntered DESC'}).usingConnection(db);

        if(previousNestsite && previousNestsite.dateEntered <= newNest.dateEntered) {
          await Birdnest.update({id: previousNestsite.id}).set({dateLeft: previousNestsite.dateEntered}).usingConnection(db);
        }
      }

      if(inputs.newCondition) {
        await Birdcondition.create({
          birdID: inputs.id,
          dateNoted: inputs.newConditionDate || new Date().getTime(),
          birdCondition: inputs.newCondition
        })
        .usingConnection(db);
      }

      })
      .intercept('E_UNIQUE', 'alreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')

      await sails.helpers.logActivity(this.req.me.id, 'Edited a bird', inputs);

    }
  };
  