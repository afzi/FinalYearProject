module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  inputs: {

    fullName: {
      type: 'string'
    }

  },


  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs) {
    // Start building the values to set in the db.
    // (We always set the fullName if provided.)
    var valuesToSet = {
      fullName: inputs.fullName,
      username: inputs.username,
    };


    // Save to the db
    await User.updateOne({id: this.req.me.id })
    .set(valuesToSet);
  }
};
