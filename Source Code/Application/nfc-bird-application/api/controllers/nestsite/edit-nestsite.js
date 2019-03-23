module.exports = {


    friendlyName: 'Edit nestsite',
  
  
    description: 'Edits a nestsite',
  
  
    inputs: {
       id: {
            required: true,
            type: 'string',
            description: 'The ID of the nestsite to edit'
            },

      nestID: {
        required: true,
        type: 'string',
        description: 'The friendly name of nest'
      },

      nestDescription: {
        required: false,
        type: 'string',
        description: 'The nest description'
      },

      distanceToHoppersKm: {
        required: false,
        type: 'number',
        description: 'Distance to the hoppers, in km'
      }
    },
  
  
    exits: {
  
      success: {
        description: 'All done.'
      },

      invalid: {
        responseType: 'badRequest',
        description: 'The provided input is invalid.',
        extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
      },
  
      alreadyInUse: {
        statusCode: 409,
        description: 'One or more of the provided fields are already in use.'
      },

      forbidden: {
        statusCode: 403,
        description: 'You are not allowed to take this action'
      }
  
    },
  
  
    fn: async function (inputs) {
      var editNestsite = await Nestsite.findOne({id: inputs.id})
      if(!this.req.me.hasEditFull) {

        if(editNestsite.createdBy != this.req.me.id) {
          throw 'forbidden'
        }
      }

        var newNestsite = await Nestsite.updateOne({id: inputs.id})
        .set({
            nestID: inputs.nestID,
            nestDescription: inputs.nestDescription,
            distanceToHoppersKm: inputs.distanceToHoppersKm,
            editedBy: this.req.session.userId
          })
          .intercept('E_UNIQUE', 'alreadyInUse')
          .intercept({name: 'UsageError'}, 'invalid');

          delete newNestsite.createdAt;
          delete newNestsite.updatedAt;
          delete newNestsite.createdBy;
          delete newNestsite.updatedBy;

          delete editNestsite.createdAt;
          delete editNestsite.updatedAt;
          delete editNestsite.createdBy;
          delete editNestsite.updatedBy;
          
          await sails.helpers.logActivity(this.req.me.id, 'Edited a nestsite', newNestsite, editNestsite);
        }

  
  
 };
  
  