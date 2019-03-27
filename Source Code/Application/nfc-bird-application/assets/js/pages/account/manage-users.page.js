parasails.registerPage('manage-users', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
        // Form data
        formData: { 
          birdName: true,
         },

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

        currentFullNameFilter: "",

        isEditMode: false,

        currentSortItem: 'username',

        currentSortDirection: 'ASC'
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    $("#editUserModal").on("hidden.bs.modal", this.exitEditMode);
    $('[data-toggle="tooltip"]').tooltip();
    this.currentFullNameFilter = SAILS_LOCALS.initialFullNameFilter;
    $("#search-input").val(this.currentFullNameFilter);
    this.refresh();
  },

  watch: {
    // whenever one of the filters changes, this function will run
    pageSize: function () {
      this.refresh();
    },

    currentFullNameFilter: function () {
      if($("#fullName").data('locked') != 1) {
        this.currentPage = 1;
        this.$refs.paginate.selected = 1;
        this.refresh();
      }
    },
    

    'formData.hasCreateEdit': function(newValue,_) {
      if(newValue === true) {
        Vue.set(this.formData, 'hasRead', true);
      }
    },
    'formData.hasEditFull': function(newValue,_) {
      if(newValue === true) {
        Vue.set(this.formData, 'hasRead', true);
        Vue.set(this.formData, 'hasCreateEdit', true);
      }
    },
    'formData.hasExport': function(newValue,_) {
      if(newValue === true) {
        Vue.set(this.formData, 'hasRead', true);
      }
    },
    'formData.hasAdmin': function(newValue,_) {
      if(newValue === true) {
        Vue.set(this.formData, 'hasRead', true);
        Vue.set(this.formData, 'hasCreateEdit', true);
        Vue.set(this.formData, 'hasExport', true);
        Vue.set(this.formData, 'hasEditFull', true);
      }
    },
    'formData.username': function() {
      this.validateUsername();
    },
    'formData.password': function() {
      this.validatePassword();
    },
    'formData.confirmPassword': function() {
      this.validateConfirmPassword();
    },
    
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
      this.isEditMode = false;
      this.formData = {};
      this.formErrors = {};
    },

    handleParsingFormCreate: function() {
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

    refresh: async function() {
      this.currentUsers = await Cloud.getUser.with({fullName: this.currentFullNameFilter, skip: (this.currentPage - 1) * this.pageSize, limit: this.pageSize, sortItem: this.currentSortItem, sortDirection: this.currentSortDirection});
      this.userCount = await Cloud.countUser.with({fullName: this.currentFullNameFilter});
    },

    handleParsingFormEdit: function() {
      var argins = this.formData;

      for (var nextValidationField in this.profileFormErrors) {
        if(this.profileFormErrors[nextValidationField] === true) {
          this.syncing = false;
          return;
        }
      }

      return argins;
    },

    validateUsername: function() {
      if(!this.formData.username || this.formData.username == "") {
        Vue.set(this.formErrors, 'username', true);
      } else {
        if(this.isEditMode) {
          Cloud.usernameExists.with({username: this.formData.username, excludeId: this.formData.id}).then(result => {
            Vue.set(this.formErrors, 'username', result);
           });
        } else {
          Cloud.usernameExists.with({username: this.formData.username}).then(result => {
            Vue.set(this.formErrors, 'username', result);
           });
        }
      }
    },

    validatePassword: function() {
      if((this.isEditMode && this.formData.password && this.formData.password.length<6) || (!this.isEditMode && (!this.formData.password || this.formData.password.length < 6))) {
        Vue.set(this.formErrors, 'password', true);
      } else {
        Vue.set(this.formErrors, 'password', false);
      }
    },

    validateConfirmPassword: function() {
      // Validate password confirmation:
      if(this.formData.password !== this.formData.confirmPassword) {
        Vue.set(this.formErrors, 'confirmPassword', true);
      } else {
        Vue.set(this.formErrors, 'confirmPassword', false);
      }
    },

    validateFullName: function() {
      if(!this.formData.fullName || this.formData.fullName === "") {
        Vue.set(this.formErrors, 'fullName', true);
      } else {
        Vue.set(this.formErrors, 'fullName', false);
      }
    },

    selectIndexFormData: async function(index) {
      this.formErrors = {};
      this.formData = this.currentUsers[index];
      this.isEditMode = true;
    },

    resetFormData: async function() {
      this.formErrors = {};
      this.formData = {};
      this.isEditMode = false;
    },

    exitEditMode: async function() {
      this.formErrors = {};
      this.formData = {};
      this.isEditMode = false;
      $('.modal').modal('hide');
    },

    pageClick: async function(pageNum) {
      this.currentPage = pageNum;
      this.refresh();
    },
    clearFilters: async function() {
      this.currentFullNameFilter = "";
 
    },

    promptDeleteUser: async function(index) {
      if(confirm(`Are you sure you want to delete user ${this.currentUsers[index].fullName}?`)) {
        await Cloud.deleteUser(this.currentUsers[index].id);
        this.refresh();
      }
    },

    // filter: async function(data) {
    //   this.currentFullNameFilter = data;
    //   this.$refs.paginate.selected = 1;
    //   this.refresh();
    // },

    reload: function() {
      location.reload();
    },

    setSortItem: async function(newSortItem, newSortDirection) {
      if(newSortItem === this.currentSortItem) {
        if(newSortDirection === 'ASC') newSortDirection = 'DESC';
        else newSortDirection = 'ASC'; // if we're just changing the direction not the sort item, we instead want to change it to the opposite of what was clicked
      }

      this.currentSortItem = newSortItem;
      this.currentSortDirection = newSortDirection;
      this.refresh();
    }
  }
});
