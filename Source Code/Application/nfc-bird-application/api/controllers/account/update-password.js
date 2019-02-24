module.exports = {


  friendlyName: 'Update password',


  description: 'Update the password for the logged-in user.',


  inputs: {

    password: {
      description: 'The new, unencrypted password.',
      example: 'abc123v2',
      required: true
    },
  },


  fn: async function (inputs) {

    // Hash the new password.
    var hashed = await sails.helpers.passwords.hashPassword(inputs.password);

    if(this.req.params['userId']) {
      targetUser = this.req.params['userId'];
    } else {
      targetUser = this.req.me.id;
    }

    // Update the record for the logged-in user.
    await User.updateOne({ id: targetUser })
    .set({
      password: hashed,
      passwordChangedBy: this.req.me.id
    });

    await sails.helpers.logActivity(this.req.me.id, 'Updated their password', {});
  }
};
