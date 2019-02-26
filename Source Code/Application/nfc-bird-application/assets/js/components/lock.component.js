/**
 * <lock>
 * -----------------------------------------------------------------------------
 * An element that will prevent a page from being used if another user is already looking at it
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('lock', {
    //  ╔═╗╦═╗╔═╗╔═╗╔═╗
    //  ╠═╝╠╦╝║ ║╠═╝╚═╗
    //  ╩  ╩╚═╚═╝╩  ╚═╝
    props: {
            user: {
                required: true,
            },
            action: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                default: 10
            },
            runOnFailed: {
              type: Function
            }

        },
    
  
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: function (){
        return {
          existingLock: null,
          intervalId: -1
        };
    },
  
    //  ╦ ╦╔╦╗╔╦╗╦
    //  ╠═╣ ║ ║║║║
    //  ╩ ╩ ╩ ╩ ╩╩═╝
    template: `
    `,
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
    },
    mounted: async function() {
      var result = await Cloud.tryAcquireRenewLock.with({userId: this.user, action: this.action, duration: this.duration});
      if(result !== true) {
        this.existingLock = result;
        this.handleFailure();
      } else {
        this.intervalId = setInterval(this.refreshLock, 500 * this.duration);
      }
    },

    beforeDestroy: function() {
      if(this.intervalId !== -1) clearInterval(this.intervalId);
    },
    destroyed: function() {
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      refreshLock: async function() {
        var result = await Cloud.tryAcquireRenewLock.with({userId: this.user, action: this.action, duration: this.duration});
        if(result !== true) {
          this.existingLock = result;
          this.handleFailure();
        }
      },

      handleFailure: function() {
        if(this.intervalId !== -1) clearInterval(this.intervalId);
        alert(`Looks like ${this.existingLock.user.fullName} is already editing the same data - please wait until they finish.`);
        if(this.runOnFailed) this.runOnFailed();
      }
    }
  });
  