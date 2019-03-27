parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Form data
    profileFormData: { /* … */ },

    passwordFormData: {},

    profileFormErrors: {},

    passwordFormErrors: {},

    // Server error state for the form
    cloudError: '',

    syncing: false,

    cloudSuccess: false,

    isEditProfileMode: false,

    isEditPasswordMode: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function (){
    _.extend(this, window.SAILS_LOCALS);
  },
  mounted: async function() {
    $('[data-toggle="tooltip"]').tooltip();
  },

  watch: {
    'passwordFormData.password': function() {
      if(this.isEditPasswordMode) {
        this.validatePassword();
      }
    },
    'passwordFormData.confirmPassword': function() {
      if(this.isEditPasswordMode) {
        this.validateConfirmPassword();
      }
    },
    'profileFormData.fullName': function() {
      if(this.isEditProfileMode) {
        this.validateFullName();
      }
    }
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedFormProfile: async function() {
      this.syncing = true;
      
      this.me.fullName = this.profileFormData.fullName;
      this.exitEditProfileMode();
      this.syncing = false;
    },

    submittedFormPassword: async function() {
      this.syncing = true;
      
      this.exitEditPasswordMode();
      this.syncing = false;
    },    

    handleParsingFormProfile: function() {
      // Clear out any pre-existing error messages.
      this.profileFormErrors = {};


      var argins = this.profileFormData;

      this.validateFullName();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      for (var nextValidationField in this.profileFormErrors) {
        if(this.profileFormErrors[nextValidationField] === true) {
          this.syncing = false;
          return;
        }
      }

      return argins;
    },

    handleParsingFormPassword: function() {
      // Clear out any pre-existing error messages.
      this.passwordFormErrors = {};


      var argins = this.passwordFormData;

      this.validatePassword();
      this.validateConfirmPassword();

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      for (var nextValidationField in this.passwordFormErrors) {
        if(this.passwordFormErrors[nextValidationField] === true) {
          this.syncing = false;
          return;
        }
      }

      return argins;
    },

    validatePassword: function() {
      if(!this.passwordFormData.password || this.passwordFormData.password.length<6) {
        Vue.set(this.passwordFormErrors, 'password', true);
      } else {
        Vue.set(this.passwordFormErrors, 'password', false);
      }
    },

    validateConfirmPassword: function() {
      // Validate password confirmation:
      if(this.passwordFormData.password !== this.passwordFormData.confirmPassword) {
        Vue.set(this.passwordFormErrors, 'confirmPassword', true);
      } else {
        Vue.set(this.passwordFormErrors, 'confirmPassword', false);
      }
    },

    validateFullName: function() {
      if(!this.profileFormData.fullName || this.profileFormData.fullName === "") {
        Vue.set(this.profileFormErrors, 'fullName', true);
      } else {
        Vue.set(this.profileFormErrors, 'fullName', false);
      }
    },

    enterEditProfileMode: async function() {
      this.profileFormData = this.me;
      this.profileFormErrors = {};
      this.isEditProfileMode = true;
    },

    exitEditProfileMode: async function() {
      this.profileFormData = {};
      this.profileFormErrors = {};
      this.isEditProfileMode = false;
    },

    enterEditPasswordMode: async function() {
      this.passwordFormData = {
        password: '',
        confirmPassword: ''
      };
      this.passwordFormErrors = {};
      this.isEditPasswordMode = true;
    },

    exitEditPasswordMode: async function() {
      this.passwordFormData = {};
      this.passwordFormErrors = {};
      this.isEditPasswordMode = false;
    }
  }
});
