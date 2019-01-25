parasails.registerPage('create-bird', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      // Form data
      formData: { sex: '' },
  
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
        
        this.validateForm();
  
        // If there were any issues, they've already now been communicated to the user,
        // so simply return undefined.  (This signifies that the submission should be
        // cancelled.)
        if (Object.keys(this.formErrors).length > 0) {
          return;
        }
  
        return argins;
      },

      validateForm: function() {
        this.validateEcho();
        this.validateRFID();
        this.validateNestsite();
        this.validateNestsiteDate();
      },

      liveValidate(toSchedule, delay) {
          var vm = this;
          setTimeout(toSchedule, delay, vm);
      },

      validateEcho: function(vm) {
        if(!vm) vm = this;
        result = Cloud.uniqueBirdName.with({echoName: vm.formData.echoName}).then(result => {
          Vue.set(vm.formErrors, 'echoName', !result);
        })

      },

      validateRFID: function(vm) {
        if(!vm) vm = this;
        result = Cloud.rfidTagExists.with({nfcFriendlyName: vm.formData.nfcRingId}).then(result => {
          Vue.set(vm.formErrors, 'nfcRingId', !result);
        })
      },

      validateNestsite: function(vm) {
        if(!vm) vm = this;
        if(vm.formData.currentNestSite && vm.formData.currentNestSite != "") {
          result = Cloud.nestsiteExists.with({nestID: vm.formData.currentNestSite}).then(result => {
            Vue.set(vm.formErrors, 'currentNestSite', !result);
          })
        }
      },

      validateNestsiteDate: function(vm) {
        if(!vm) vm = this;
        if(vm.formData.currentNestSite && vm.formData.currentNestSite != "" && (!vm.formData.currentNestSiteDate || vm.formData.currentNestSiteDate == "")) {
          Vue.set(vm.formErrors, 'currentNestSiteDate', true);
        } else {
          Vue.set(vm.formErrors, 'currentNestSiteDate', false);
        }
      }
  
    }
  });