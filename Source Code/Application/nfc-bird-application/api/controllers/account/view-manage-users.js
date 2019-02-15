module.exports = {


  friendlyName: 'View manage users',


  description: 'Display "Manage users" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/account/manage-users'
    }

  },


  fn: function () {

    // Respond with view.
    return { title: 'Manage Users' };

  }


};
