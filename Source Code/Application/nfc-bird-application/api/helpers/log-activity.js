module.exports = {

    friendlyName: 'Log user activity',
  
  
    description: 'Logs user activity in the Changelog table',
  
  
    inputs: {
  
      userId: {
        type: 'string',
        description: 'The ID of the user who took the action.',
        required: true
      },

      action: {
        type: 'string',
        description: 'The type of the action.',
        required: true
      },

      data: {
        type: 'json',
        description: 'Any data associated with the action',
        required: true
      }
  
    },
  
  
    fn: async function (inputs, exits) {
      await Changelog.create({
          user: inputs.userId,
          action: inputs.action,
          data: JSON.stringify(inputs.data, null, '\t')
      })
      return exits.success();
    }
  
  };