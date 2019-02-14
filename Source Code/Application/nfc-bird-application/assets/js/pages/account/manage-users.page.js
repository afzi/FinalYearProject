parasails.registerPage('manage-users', {
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
    
        currentUsers: [],
    
        userCount: 0,
    
        pageSize: 20,
    
        currentPage: 1,

        currentFullNameFilter: ""
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    $('[data-toggle="tooltip"]').tooltip();
    this.refresh();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: async function() {
      this.syncing = true;
      this.refresh();
      $('.modal').modal('hide');
      this.syncing = false;
    },

    handleParsingFormCreate: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};


      var argins = this.formData;

      // Validate full name:
      if(!argins.fullName) {
        this.formErrors.fullName = true;
      }

      // Validate email:
      if(!argins.username || argins.username.length < 4 || argins.username.length > 20) {
        this.formErrors.username = true;
      }

      // Validate password:
      if(!argins.password || argins.password.length<6) {
        this.formErrors.password = true;
      }

      // Validate password confirmation:
      if(argins.password && argins.password !== argins.confirmPassword) {
        this.formErrors.confirmPassword = true;
      }
      
      this.validateUsername();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    refresh: async function() {
      this.currentUsers = await Cloud.getUser.with({fullName: this.currentFullNameFilter, skip: (this.currentPage - 1) * this.pageSize, limit: this.pageSize});
      this.currentUsers = this.currentUsers.map(user => {
        user.password = "";
        user.confirmPassword = "";
        return user;
      });
      this.userCount = await Cloud.countUser.with({fullName: this.currentFullNameFilter});
    },

    handleParsingFormEdit: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};


      var argins = this.formData;

      // Validate full name:
      if(!argins.fullName) {
        this.formErrors.fullName = true;
      }

      // Validate email:
      if(!argins.username || argins.username.length < 4 || argins.username.length > 20) {
        this.formErrors.username = true;
      }

      // Validate password:
      if(argins.password && argins.password.length<6) {
        this.formErrors.password = true;
      }

      // Validate password confirmation:
      if((argins.password || argins.confirmPassword) && argins.password !== argins.confirmPassword) {
        this.formErrors.confirmPassword = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    validateUsername: function() {
      if(!this.formData.username || this.formData.username == "") {
        this.formErrors.username = true;
      } else {
        Cloud.usernameExists.with({username: this.formData.username}).then(result => {
          this.formErrors.username = result;
         });
      }
    },

    selectIndexFormData: async function(index) {
      this.formErrors = {};
      this.formData = this.currentUsers[index];
    },

    resetFormData: async function() {
      this.formErrors = {};
      this.formData = {};
    },

    pageClick: async function(pageNum) {
      this.currentPage = pageNum;
      this.refresh();
    },

    promptDeleteUser: async function(index) {
      if(confirm(`Are you sure you want to delete user ${this.currentUsers[index].username}?`)) {
        await Cloud.deleteUser(this.currentUsers[index].id);
        this.refresh();
      }
    },

    filter: async function(data) {
      this.currentFullNameFilter = data;
      this.refresh();
    }
  }
});
