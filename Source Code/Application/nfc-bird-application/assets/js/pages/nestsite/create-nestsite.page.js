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

    currentNestsites: [],

    nestsiteCount: 0,

    pageSize: 15,

    currentPage: 1,

    isEditMode: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    $("#editNestsiteModal").on("hidden.bs.modal", this.exitEditMode);
    await this.refresh();
  },

  watch: {
    // whenever one of the filters changes, this function will run
    pageSize: function (_, _) {
      this.refresh();
    },

    'formData.nestID': function(_,_) {
      if($("#nestID").data('locked') != 1) {
        this.validateNestName();
      }
    }
    
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    refresh: async function() {
      this.currentNestsites = await Cloud.getNestsite.with({includeBirds: true, skip: (this.currentPage - 1) * this.pageSize, limit: this.pageSize});
      this.nestsiteCount = await Cloud.countNestsite();
    },

    submittedForm: async function() {
      this.syncing = true;
      await this.refresh();
      this.exitEditMode();
      this.syncing = false;
    },

    handleParsingFormCreate: function() {
      var argins = this.formData;
      
      for (var nextValidationField in this.formErrors) {
        if(this.formErrors[nextValidationField] === true) {
          this.syncing = false;
          return;
        }
      }

      return argins;
    },

    handleParsingFormEdit: function() {
      var argins = this.formData;

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      for (var nextValidationField in this.formErrors) {
        if(this.formErrors[nextValidationField] === true) {
          this.syncing = false;
          return;
        }
      }

      return argins;
    },

    validateNestName: function() {
      if(!this.formData.nestID || this.formData.nestID == "") {
        Vue.set(this.formErrors, 'nestID', true);
      } else {
        Cloud.nestsiteExists.with({nestID: this.formData.nestID}).then(result => {
          Vue.set(this.formErrors, 'nestID', result);
         });
      }
    },

    selectIndexFormData: async function(index) {
      $('#editNestsiteModal').modal('show');
      this.formErrors = {};
      this.formData = this.currentNestsites[index];
      this.isEditMode = true;
    },

    resetFormData: async function() {
      this.formErrors = {};
      this.formData = {};
    },

    pageClick: async function(pageNum) {
      this.currentPage = pageNum;
      await this.refresh();
    },

    exitEditMode: async function() {
      this.formErrors = {};
      this.formData = {};
      this.isEditMode = false;
      $('#editNestsiteModal').modal('hide');
    },

    promptDeleteNestsite: async function(index) {
      if(confirm(`Are you sure you want to delete nestsite ${this.currentNestsites[index].nestID}?`)) {
        await Cloud.deleteNestsite(this.currentNestsites[index].id);
        await this.refresh();
      }
    },

    reload: function() {
      location.reload();
    }

  }
});
