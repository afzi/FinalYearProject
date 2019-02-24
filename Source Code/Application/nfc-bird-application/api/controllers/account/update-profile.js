module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    fullName: {
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'All good dawg.'
    }
  },


  fn: async function (inputs) {
    // Start building the values to set in the db.
    // (We always set the fullName if provided.)

    var query = {}

    if(inputs.fullName) {
      query.fullName = inputs.fullName;
      // Save to the db
      await User.updateOne({id: this.req.me.id })
      .set(query);

      await sails.helpers.logActivity(this.req.me.id, 'Updated their Full Name', inputs);
    } 
  }
};
