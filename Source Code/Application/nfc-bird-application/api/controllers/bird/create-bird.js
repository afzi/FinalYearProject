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
        description: 'The new STUD ID (legacy)'
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

      motherId: {
        required: false,
        type: 'string',
        description: 'The ID of the mother bird',
        extendedDescription: 'Must match an existing bird in the database.'
      },

      fatherId: {
        required: false,
        type: 'string',
        description: 'The ID of the father bird.',
        extendedDescription: 'Must match an existing bird in the database.'
      },

      fatherName: {
        required: false,
        type: 'string',
        description: 'The name of the father bird, if not stored in the database.',
        extendedDescription: 'If this is provided, fatherId must be empty'
      },

      secondFatherId: {
        required: false,
        type: 'string',
        description: 'The ID of the second father bird.',
        extendedDescription: 'Must match an existing bird in the database.'
      },

      secondFatherName: {
        required: false,
        type: 'string',
        description: 'The name of the second father bird, if not stored in the database.',
        extendedDescription: 'If this is provided, secondFatherId must be empty'
      },

      groupName: {
        required: false,
        type: 'string',
        description: 'The group to assign this bird to.'
      },

      motherName: {
        required: false,
        type: 'string',
        description: 'The name of the mother bird, if not stored in the database.',
        extendedDescription: 'If this is provided, secondFatherId must be empty'
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
  
    },
  
  
    exits: {
  
      success: {
        description: 'New user account was created successfully.'
      },
  
      invalid: {
        responseType: 'badRequest',
        description: 'The provided fullName, password and/or username are invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
      usernameAlreadyInUse: {
        statusCode: 409,
        description: 'The provided username is already in use.',
      },
  
    },
  
  
    fn: async function (inputs) {
  
      var newUsername = inputs.username.toLowerCase();
  
      // Build up data for the new user record and save it to the database.
      // (Also use `fetch` to retrieve the new ID so that we can use it below.)
      var newUserRecord = await User.create(_.extend({
        username: newUsername,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        fullName: inputs.fullName
      }))
      .intercept('E_UNIQUE', 'usernameAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();
  
      // Store the user's new id in their session.
      this.req.session.userId = newUserRecord.id;
    }
  
  };
  