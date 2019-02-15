module.exports = {


  friendlyName: 'View user activity monitor',


  description: 'Display "User activity monitor" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/changelog/user-activity-monitor'
    }

  },


  fn: function () {

    // Respond with view.
    return {title: 'User Activity Monitor'};

  }


};
