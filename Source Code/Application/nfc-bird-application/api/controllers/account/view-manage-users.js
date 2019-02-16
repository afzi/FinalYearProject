module.exports = {


  friendlyName: 'View manage users',


  description: 'Display "Manage users" page.',

  inputs: {
    initialFullNameFilter: {
      required: false,
      type: 'string',
      description: 'The initial filter on the full name'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/account/manage-users'
    }

  },


  fn: function (inputs) {
    // Respond with view.
    return { title: 'Manage Users', initialFullNameFilter: inputs.initialFullNameFilter };

  }


};
