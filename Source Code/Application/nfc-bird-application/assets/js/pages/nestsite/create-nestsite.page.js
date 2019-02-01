parasails.registerPage('create-nestsite', {
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
      if(this.formData.distanceToHoppers && this.formData.distanceUnits == "km") {
        argins.distanceToHopperMetres = this.formData.distanceToHoppers * 1000;
      } else {
        argins.distanceToHopperMetres = this.formData.distanceToHoppers;
      }

      
      this.validateNestName();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    validateNestName: function(vm) {
      if(!vm) vm = this;
      result = Cloud.nestsiteExists.with({nestID: vm.formData.nestID}).then(result => {
        Vue.set(vm.formErrors, 'nestID', result);
      })
    },

    liveValidate(toSchedule, delay) {
      var vm = this;
      setTimeout(toSchedule, delay, vm);
    }

  }
});
