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

      newData: {
        type: 'json',
        description: 'Any new data associated with the action',
        required: true
      },

      oldData: {
        type: 'json',
        description: 'Any old data associated with the action',
        required: true
      }
  
    },
  
  
    fn: async function (inputs, exits) {
      await Changelog.create({
          user: inputs.userId,
          action: inputs.action,
          newData: JSON.stringify(inputs.newData, null, '\t'),
          oldData: JSON.stringify(inputs.oldData, null, '\t')
      })
      return exits.success();
    }
  
  };