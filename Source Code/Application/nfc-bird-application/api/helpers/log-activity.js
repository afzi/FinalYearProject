let _ = require('underscore');

function deepDiff(a, b, r, reversible) {
  _.each(a, function(v, k) {
    // already checked this or equal...
    if (r.hasOwnProperty(k) || b && b[k] === v) return;
    // but what if it returns an empty object? still attach?
    r[k] = _.isObject(v) ? _.diff(v, b[k], reversible) : v;
  });
}

/* the function */
_.mixin({
  diff: function(a, b, reversible) {
    var r = {};
    deepDiff(a, b, r, reversible);
    if(reversible) deepDiff(b, a, r, reversible);
    return r;
  }
});

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
      let newDataDiff = _.diff(inputs.newData, inputs.oldData);
      let oldDataDiff = _.diff(inputs.oldData, inputs.newData);

      await Changelog.create({
          user: inputs.userId,
          action: inputs.action,
          newData: JSON.stringify(newDataDiff, null, '\t'),
          oldData: JSON.stringify(oldDataDiff, null, '\t')
      })
      return exits.success();
    }
  
  };