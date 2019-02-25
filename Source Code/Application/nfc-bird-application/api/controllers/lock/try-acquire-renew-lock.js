module.exports = {

    friendlyName: 'Try / acquire / renew lock',
  
  
    description: "Attempts to acquire a lock. If requesting user already has an active lock, it's renewed. If another user has an active lock, return the lock object. Else, return true",
  
  
    inputs: {
  
      userId: {
        type: 'string',
        description: 'The ID of the user who\'s requesting the lock.',
        required: true
      },

      action: {
        type: 'string',
        description: 'The type of the action.',
        required: true
      },

      duration: {
        type: 'number',
        description: 'How long, from the time this controller was called, do we want to keep this lock (seconds).',
        default: 5
      },
  
    },
  
  
    fn: async function (inputs) {
      var existingLock = (await Lock.find({
          action: inputs.action,
          expiresAt: {
              '>=': new Date().getTime()
          }
      }).populate('user'))[0];
      
      if(existingLock) {
          if(existingLock.user.id != inputs.userId) {
              return existingLock;
          } else {
              var newExpiresAt = new Date();
              newExpiresAt.setTime(newExpiresAt.getTime() + (inputs.duration * 1000));
              await Lock.update({id: existingLock.id}).set({
                expiresAt: newExpiresAt.getTime()
              })
          }
      } else {
        var newExpiresAt = new Date();
        newExpiresAt.setTime(newExpiresAt.getTime() + (inputs.duration * 1000));

        var existingUserLock = await Lock.find({
          action: inputs.action,
          user: inputs.userId
        })[0]; // so that we don't have way too many entries in the database, find the last lock used by the user, and update that one

        if(existingUserLock) {
          await Lock.update({id: existingUserLock.id}).set({
            expiresAt: newExpiresAt.getTime()
          })
        } else {
          await Lock.create({
            user: inputs.userId,
            action: inputs.action,
            expiresAt: newExpiresAt.getTime()
        })
        }
      } 

      return true;
    }
  
  };