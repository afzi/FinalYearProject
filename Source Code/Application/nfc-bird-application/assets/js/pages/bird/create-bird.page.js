parasails.registerPage('create-bird', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      // Form data
      formData: { /* … */ },
  
      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: { /* … */ },
  
      // Syncing / loading state
      syncing: false,
  
      // Server error state
      cloudError: '',
  
      // Success state when form has been submitted
      cloudSuccess: false,
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
    },
    mounted: async function() {
      //…
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
  
      submittedForm: async function() {
        this.syncing = true;
        window.location = '/';
      },
  
      handleParsingForm: function() {
        // Clear out any pre-existing error messages.
        this.formErrors = {};
  
        var argins = this.formData;
        
        this.validateEcho();
        this.validateRFID();
  
        // If there were any issues, they've already now been communicated to the user,
        // so simply return undefined.  (This signifies that the submission should be
        // cancelled.)
        if (Object.keys(this.formErrors).length > 0) {
          return;
        }
  
        return argins;
      },

      validateEcho: function() {
        var isUniqueBirdName = parasails.require('isUniqueBirdName')


        result = isUniqueBirdName(this.formData.echoName).then(result => {
          this.formErrors.echoName = !result;
        })

      },

      validateRFID: function() {
        var isValidRfidTag = parasails.require('isValidRfidTag')

        result = isValidRfidTag(this.formData.nfcRingId).then(result => {
          this.formErrors.nfcRingId = !result;
        })
      }
  
    }
  });