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
      var oldUserRecord = await User.findOne({id: this.req.me.id});

      query.fullName = inputs.fullName;
      // Save to the db
      var newUserRecord = await User.updateOne({id: this.req.me.id })
      .set(query);

      delete newUserRecord.createdAt;
      delete newUserRecord.updatedAt;
      delete newUserRecord.createdBy;
      delete newUserRecord.updatedBy;

      delete oldUserRecord.createdAt;
      delete oldUserRecord.updatedAt;
      delete oldUserRecord.createdBy;
      delete oldUserRecord.updatedBy;
      
      await sails.helpers.logActivity(this.req.me.id, 'Updated their Full Name', newUserRecord, oldUserRecord);
    } 
  }
};
