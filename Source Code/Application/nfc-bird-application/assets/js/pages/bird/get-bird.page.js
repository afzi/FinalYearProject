parasails.registerPage('get-bird', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        modal: '',
        pageLoadedAt: Date.now(),
        cloudSuccess: false,
        // result: {},

        currentBirds: [],

        BirdCount: 0,

        pageSize: 20,

        currentPage: 1,

        currentBirdFilter: "",
        
        currentBirdIdFilter: "",

        currentSexFilter: "",

        currentFatherFilter:"",

        currentMotherFilter: "",
        
        currentBreederFilter:"",

        currentNestSiteFilter: "",

        currentBird: {},

        isEditMode: false,

        isCreateMode: false,

        editBirdData: {},

        createBirdData: {},

        editBirdErrors: {},

        createBirdErrors: {},

        editValidationCounter: 0,

        // Syncing / loading state
        syncing: false,

        // Server error state
        cloudError: '',

        // Success state when form has been submitted
        cloudSuccess: false,

        datepickerOptions: {
          icons: {
              time: 'far fa-clock',
              date: 'far fa-calendar',
              up: 'fas fa-arrow-up',
              down: 'fas fa-arrow-down',
              previous: 'fas fa-chevron-left',
              next: 'fas fa-chevron-right',
              today: 'fas fa-calendar-check',
              clear: 'far fa-trash-alt',
              close: 'far fa-times-circle'
          },
          format: 'DD/MM/YYYY',
          maxDate: new Date(),
          showTodayButton: true,
          showClear: true,
          showClose: true,
          // debug: true
      }
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
        // Attach any initial data from the server.
        _.extend(this, SAILS_LOCALS);
    },
    mounted: async function() {
        this.refresh();
    },

    watch: {
      // whenever one of the filters changes, this function will run
      currentBirdFilter: function (_, _) {
        if($("#birdName").data('locked') != 1) {
          this.refresh();
        }
      },
      currentSexFilter: function (_, _) {
        this.refresh();
      },
      currentBirdIdFilter: function (_, _) {
        if($("#studID").data('locked') != 1) {
          this.refresh();
        }
      },
      currentFatherFilter: function (_, _) {
        if($("#fatherName").data('locked') != 1) {
          this.refresh();
        }
      },
      currentMotherFilter: function (_, _) {
        if($("#motherName").data('locked') != 1) {
          this.refresh();
        }
      },
      currentBreederFilter: function (_, _) {
        this.refresh();
      },
      currentNestSiteFilter: function (_, _) {
        if($("#currentNestSite").data('locked') != 1) {
          this.refresh();
        }
      },
      pageSize: function (_, _) {
        this.refresh();
      },

      'editBirdData.fledgedWhere': function (_, newValue) {
        if(this.isEditMode && $("#fledgedWhereEdit").data('locked') != 1) {
          this.validateNestsite('fledgedWhere');
        }
      },

      'editBirdData.laidWhere': function (_, newValue) {
        if(this.isEditMode && $("#laidWhereEdit").data('locked') != 1) {
          this.validateNestsite('laidWhere');
        }
      },

      'editBirdData.hatchedWhere': function (_, newValue) {
        if(this.isEditMode && $("#hatchedWhereEdit").data('locked') != 1) {
          this.validateNestsite('hatchedWhere');
        }
      },

      'editBirdData.releasedWhere': function (_, newValue) {
        if(this.isEditMode && $("#releasedWhereEdit").data('locked') != 1) {
          this.validateNestsite('releasedWhere');
        }
      },

      'editBirdData.birdName': function (_, _) {
        if(this.isEditMode) {
          this.validateUniqueBirdName(this.editBirdData.id);
        }
      },

      'editBirdData.newBreedingSite': function(_, newValue) {
        if(this.isEditMode) {
          this.validateNestsite('newBreedingSite');
        }
      },

      'editBirdData.nfcRingID': function(_, newValue) {
        if(this.isEditMode && $("#releasedWhereEdit").data('locked') != 1) {
          this.validateRFID();
        }
      },

      'createBirdData.fledgedWhere': function (_, newValue) {
        if(this.isCreateMode && $("#fledgedWhereCreate").data('locked') != 1) {
          this.validateNestsite('fledgedWhere');
        }
      },

      'createBirdData.laidWhere': function (_, newValue) {
        if(this.isCreateMode && $("#laidWhereCreate").data('locked') != 1) {
          this.validateNestsite('laidWhere');
        }
      },

      'createBirdData.hatchedWhere': function (_, newValue) {
        if(this.isCreateMode && $("#hatchedWhereCreate").data('locked') != 1) {
          this.validateNestsite('hatchedWhere');
        }
      },

      'createBirdData.releasedWhere': function (_, newValue) {
        if(this.isCreateMode && $("#releasedWhereCreate").data('locked') != 1) {
          this.validateNestsite('releasedWhere');
        }
      },

      'createBirdData.birdName': function (_, _) {
        if(this.isCreateMode) {
          this.validateUniqueBirdName(this.editBirdData.id);
        }
      },

      'createBirdData.newBreedingSite': function(_, newValue) {
        if(this.isCreateMode) {
          this.validateNestsite('newBreedingSite');
        }
      },

      'createBirdData.nfcRingID': function(_, newValue) {
        if(this.isCreateMode && $("#releasedWhereCreate").data('locked') != 1) {
          this.validateRFID();
        }
      },
      
    },


  //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
  //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
  // Configure deep-linking (aka client-side routing)
  virtualPagesRegExp: /^\/birds\/?([^\/]+)?\/?/,
  afterNavigate: async function(virtualPageSlug){
    // `virtualPageSlug` is determined by the regular expression above, which
    // corresponds with `:unused?` in the server-side route for this page.
    switch (virtualPageSlug) {

        case'single':
          this.modal = 'example3';
          break;
        case 'create':
          this.modal = 'createBirdModal';
          break;

      default: this.modal = '';

        
    }
  },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      submittedFormEdit: async function() {
        this.syncing = true;
        await this.refresh();
        if(this.isEditMode) {
          this.currentBird = (await Cloud.getBird.with({id: this.editBirdData.id, includeVisits: true, includeNestsites: true, includeConditions: true}))[0]
          this.exitEditMode();
        }
        this.syncing = false;
      },

      submittedFormCreate: async function() {
        this.syncing = true;
        await this.refresh();
        if(this.isEditMode) {
          this.closeCreateBirdModal(false);
        }
        this.syncing = false;
      },

      handleParsingFormEdit: function() {
        // Clear out any pre-existing error messages.
        // this.formErrors = {};
        // this.editValidationCounter = 0;
  
  
        var argins =  $.extend({}, this.editBirdData);

        if(this.editBirdData.hatchDate != null && this.hatchDate != "") {
          argins.hatchDate = moment(this.editBirdData.hatchDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.hatchDate = undefined;
        }
        if(this.editBirdData.newConditionDate != null && this.newConditionDate != "") {
          argins.newConditionDate = moment(this.editBirdData.newConditionDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.newConditionDate = undefined;
        }
        if(this.editBirdData.layDate != null && this.editBirdData.layDate != "") {
          argins.layDate = moment(this.editBirdData.layDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.layDate = undefined;
        }
        if(this.editBirdData.fledgeDate != null && this.editBirdData.fledgeDate != "") {
          argins.fledgeDate = moment(this.editBirdData.fledgeDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.fledgeDate = undefined;
        }
        if(this.editBirdData.releasedWhen != null && this.editBirdData.releasedWhen != "") {
          argins.releasedWhen = moment(this.editBirdData.releasedWhen, 'DD/MM/YYYY').format("X");
        } else {
          argins.releasedWhen = undefined;
        }
        if(this.editBirdData.newBreedingSiteDate != null && this.editBirdData.newBreedingSiteDate != "") {
          argins.newBreedingSiteDate = moment(this.editBirdData.newBreedingSiteDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.newBreedingSiteDate = undefined;
        }

        // to be safe, we should also do validation on form submit, however it should be done asynchronously, and ajax-form doesn't work with async parse function...

        // this.validateNestsite('fledgedWhere');
        // this.validateNestsite('releasedWhere');
        // this.validateNestsite('laidWhere');
        // this.validateNestsite('hatchedWhere');
        // this.validateNestsite('newBreedingSite');
        // this.validateUniqueBirdName(this.editBirdData.id);
        // this.validateNewCondition();
        // this.validateNewBreedingSite();
        // this.validateRFID();

        // while(this.editValidationCounter < 9) {
        //   console.log(this.editValidationCounter);
        // } // wait until validation has finished on all fields

  
        // If there were any issues, they've already now been communicated to the user,
        // so simply return undefined.  (This signifies that the submission should be
        // cancelled.)

        for (var nextValidationField in this.editBirdErrors) {
          if(this.editBirdErrors[nextValidationField] == true) {
            this.syncing = false;
            return;
          }
        }
  
        return argins;
      },

      handleParsingFormCreate: function() {
        // Clear out any pre-existing error messages.
        // this.formErrors = {};
        // this.createValidationCounter = 0;
  
  
        var argins =  $.extend({}, this.createBirdData);

        if(this.createBirdData.hatchDate != null && this.hatchDate != "") {
          argins.hatchDate = moment(this.createBirdData.hatchDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.hatchDate = undefined;
        }
        if(this.createBirdData.newConditionDate != null && this.newConditionDate != "") {
          argins.newConditionDate = moment(this.createBirdData.newConditionDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.newConditionDate = undefined;
        }
        if(this.createBirdData.layDate != null && this.createBirdData.layDate != "") {
          argins.layDate = moment(this.createBirdData.layDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.layDate = undefined;
        }
        if(this.createBirdData.fledgeDate != null && this.createBirdData.fledgeDate != "") {
          argins.fledgeDate = moment(this.createBirdData.fledgeDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.fledgeDate = undefined;
        }
        if(this.createBirdData.releasedWhen != null && this.createBirdData.releasedWhen != "") {
          argins.releasedWhen = moment(this.createBirdData.releasedWhen, 'DD/MM/YYYY').format("X");
        } else {
          argins.releasedWhen = undefined;
        }
        if(this.createBirdData.newBreedingSiteDate != null && this.createBirdData.newBreedingSiteDate != "") {
          argins.newBreedingSiteDate = moment(this.createBirdData.newBreedingSiteDate, 'DD/MM/YYYY').format("X");
        } else {
          argins.newBreedingSiteDate = undefined;
        }

        // to be safe, we should also do validation on form submit, however it should be done asynchronously, and ajax-form doesn't work with async parse function...

        // this.validateNestsite('fledgedWhere');
        // this.validateNestsite('releasedWhere');
        // this.validateNestsite('laidWhere');
        // this.validateNestsite('hatchedWhere');
        // this.validateNestsite('newBreedingSite');
        // this.validateUniqueBirdName(this.createBirdData.id);
        // this.validateNewCondition();
        // this.validateNewBreedingSite();
        // this.validateRFID();

        // while(this.createValidationCounter < 9) {
        //   console.log(this.createValidationCounter);
        // } // wait until validation has finished on all fields

  
        // If there were any issues, they've already now been communicated to the user,
        // so simply return undefined.  (This signifies that the submission should be
        // cancelled.)

        for (var nextValidationField in this.createBirdErrors) {
          if(this.createBirdErrors[nextValidationField] == true) {
            this.syncing = false;
            return;
          }
        }
  
        return argins;
      },

      refresh: async function() {


        var params = {};

        if(this.currentBirdFilter != null && this.currentBirdFilter != "") {
          params.birdName = this.currentBirdFilter;
        }
  
        if(this.currentBirdIdFilter != null && this.currentBirdIdFilter != "") {
          params.studID = this.currentBirdIdFilter;
        }    
  
        if(this.currentSexFilter != null && this.currentSexFilter != "") {
          params.sex = this.currentSexFilter;
        }
  
        if(this.currentFatherFilter != null && this.currentFatherFilter != "") {
          params.fatherName = this.currentFatherFilter;
        }

        if(this.currentMotherFilter != null && this.currentMotherFilter != "") {
          params.motherName = this.currentMotherFilter;
        }
        
        if(this.currentBreederFilter != null && this.currentBreederFilter != "") {
          params.isBreeder = this.currentBreederFilter;
        }

        if(this.currentNestSiteFilter != null && this.currentNestSiteFilter != "") {
          params.currentNestSite = this.currentNestSiteFilter;
        }

        params.includeConditions = true;
        params.includeNestsites = true;
        params.includeVisits = true;

  
        params.skip = (this.currentPage - 1) * this.pageSize;
  
        params.limit = this.pageSize;
  
        this.currentBirds = await Cloud.getBird.with(params);
        this.BirdCount = await Cloud.countBirds.with(params);
      },

        pageClick: async function(pageNum) {
            this.currentPage = pageNum;
            this.refresh();
          },

          clearFilters: async function() {
            this.currentBirdFilter = "";
            this.currentBirdIdFilter = "";
            this.currentSexFilter = "";
            this.currentFatherFilter = "";
            this.currentMotherFilter = "";
            this.currentBreederFilter = "";
            this.currentNestSiteFilter = "";
          },

          validateNestsite: function(fieldName) {
            if(this.isEditMode) {
              if(!this.editBirdData[fieldName] || this.editBirdData[fieldName] === "") {
                Vue.set(this.editBirdErrors, fieldName, false);
              } else {
                Cloud.nestsiteExists.with({nestID: this.editBirdData[fieldName]}).then(result => {
                  Vue.set(this.editBirdErrors, fieldName, !result);
                  });
              }
            } else if(this.isCreateMode) {
              if(!this.createBirdData[fieldName] || this.createBirdData[fieldName] === "") {
                Vue.set(this.createBirdErrors, fieldName, false);
              } else {
                Cloud.nestsiteExists.with({nestID: this.createBirdData[fieldName]}).then(result => {
                  Vue.set(this.createBirdErrors, fieldName, !result);
                  });
              }
            }
          },

          validateRFID: function() {
            if(this.isEditMode) {
              if(!this.editBirdData.nfcRingID || this.editBirdData.nfcRingID == "") {
                Vue.set(this.editBirdErrors, 'nfcRingID', false);
              }
              else {
                result = Cloud.rfidTagExists.with({nfcFriendlyName: this.editBirdData.nfcRingID, assignedStatus: false, excludeBirdId: this.editBirdData.id}).then(result => {
                  Vue.set(this.editBirdErrors, 'nfcRingID', !result);
                })
              }
            } else if(this.isCreateMode) {
              if(!this.createBirdData.nfcRingID || this.createBirdData.nfcRingID == "") {
                Vue.set(this.createBirdErrors, 'nfcRingID', false);
              }
              else {
                result = Cloud.rfidTagExists.with({nfcFriendlyName: this.createBirdData.nfcRingID, assignedStatus: false}).then(result => {
                  Vue.set(this.createBirdErrors, 'nfcRingID', !result);
                })
              }
            }
          },

          validateUniqueBirdName: function(thisBirdId) {
            if(this.isEditMode) {
              if(!this.editBirdData.birdName || this.editBirdData.birdName === "") {
                Vue.set(this.editBirdErrors, 'birdName', true);
              } else {
                result = Cloud.uniqueBirdName.with({echoName: this.editBirdData.birdName, excludeId: thisBirdId}).then(result => {
                  Vue.set(this.editBirdErrors, 'birdName', !result);
                })
              }
            } else if(this.isCreateMode) {
              if(!this.createBirdData.birdName || this.createBirdData.birdName === "") {
                Vue.set(this.createBirdErrors, 'birdName', true);
              } else {
                result = Cloud.uniqueBirdName.with({echoName: this.createBirdData.birdName}).then(result => {
                  Vue.set(this.createBirdErrors, 'birdName', !result);
                })
              }
            }
          },

          validateNewCondition: function() {
            if(this.isEditMode) {
              if(this.editBirdData.newCondition && this.editBirdData.newCondition != "" && (!this.editBirdData.newConditionDate || this.editBirdData.newConditionDate == '')) {
                Vue.set(this.editBirdErrors, 'conditionDate', true);
              } else {
                Vue.set(this.editBirdErrors, 'conditionDate', false);
              }
            } else if(this.isCreateMode) {
              if(this.createBirdData.newCondition && this.createBirdData.newCondition != "" && (!this.createBirdData.newConditionDate || this.createBirdData.newConditionDate == '')) {
                Vue.set(this.createBirdErrors, 'conditionDate', true);
              } else {
                Vue.set(this.createBirdErrors, 'conditionDate', false);
              }
            }
          },

          validateNewBreedingSite: function() {
            if(this.isEditMode) {
              if(this.editBirdData.newBreedingSite && this.editBirdData.newBreedingSite != "" && (!this.editBirdData.newBreedingSiteDate || this.editBirdData.newBreedingSiteDate == '')) {
                Vue.set(this.editBirdErrors, 'newBreedingSiteDate', true);
              } else {
                Vue.set(this.editBirdErrors, 'newBreedingSiteDate', false);
              }
            } else if(this.isCreateMode) {
              if(this.createBirdData.newBreedingSite && this.createBirdData.newBreedingSite != "" && (!this.createBirdData.newBreedingSiteDate || this.createBirdData.newBreedingSiteDate == '')) {
                Vue.set(this.createBirdErrors, 'newBreedingSiteDate', true);
              } else {
                Vue.set(this.createBirdErrors, 'newBreedingSiteDate', false);
              }
            }
          },

        clickOpenExampleModalButton3: async function(index) {
            this.currentBird = this.currentBirds[index];
            this.goto('/birds/single');
            // Or, without deep links, instead do:
            // ```
            // this.modal = 'example';
            // ```
          },

          openCreateBirdModal: async function() {
            this.enterCreateMode();
            this.goto('/birds/create');
            // Or, without deep links, instead do:
            // ```
            // this.modal = 'example';
            // ```
          },

          closeSingleViewModal: function() {
            if(!this.isEditMode || (this.isEditMode && this.promptExitEditMode())) {
              this.currentBird = {};
              $('#singleViewModal').modal('hide');
              this.goto('/birds');
            }
            // Or, without deep links, instead do:
            // ```
            // this.modal = '';
            // ```
          },

          
          closeCreateBirdModal: function(prompt) {
            if(!prompt || this.promptExitCreateMode()) {
              $('#createBirdModal').modal('hide');
              this.goto('/birds');
            }
            // Or, without deep links, instead do:
            // ```
            // this.modal = '';
            // ```
          },

      enterEditMode: async function() {
        this.editBirdData = $.extend({}, this.currentBird);
        this.editBirdData.hatchDate = this.currentBird.hatchDate ? new Date(this.currentBird.hatchDate * 1000) : null;
        this.editBirdData.layDate = this.currentBird.layDate ? new Date(this.currentBird.layDate * 1000 ) : null;
        this.editBirdData.fledgeDate = this.currentBird.fledgeDate ? new Date(this.currentBird.fledgeDate * 1000 ) : null;
        this.editBirdData.releasedWhen = this.currentBird.releasedWhen ? new Date(this.currentBird.releasedWhen * 1000 ) : null;
        this.editBirdData.hatchedWhere = this.currentBird.hatchedWhere ? this.currentBird.hatchedWhere.nestID : "";
        this.editBirdData.fledgedWhere = this.currentBird.fledgedWhere ? this.currentBird.fledgedWhere.nestID : "";
        this.editBirdData.releasedWhere = this.currentBird.releasedWhere ? this.currentBird.releasedWhere.nestID : "";
        this.editBirdData.laidWhere = this.currentBird.laidWhere ? this.currentBird.laidWhere.nestID : "";
        this.createBirdData.status = this.currentBird.status || 'alive';
        this.createBirdData.sex = this.currentBird.sex || 'unknown';
        this.createBirdData.isBreeder = this.currentBird.isBreeder || 'unknown';
        this.editBirdData.newConditionDate = new Date();
        this.editBirdData.newBreedingSiteDate = new Date();
        this.editBirdErrors = {},
        this.isEditMode = true;
      },

      enterCreateMode: async function() {
        this.createBirdData = {};
        this.createBirdData.hatchDate = null;
        this.createBirdData.layDate = null;
        this.createBirdData.fledgeDate = null;
        this.createBirdData.releasedWhen = null;
        this.createBirdData.status = 'alive';
        this.createBirdData.sex = 'unknown';
        this.createBirdData.isBreeder = 'unknown';
        this.createBirdData.newConditionDate = new Date();
        this.createBirdData.newBreedingSiteDate = new Date();
        this.createBirdErrors = {},
        this.isCreateMode = true;
      },

      exitEditMode: function() {
        this.isEditMode = false;
        this.editBirdData = {}
        this.editBirdErrors = {}
      },

      exitCreateMode: function() {
        this.isCreateMode = false;
        this.createBirdData = {}
        this.createBirdErrors = {}
      },

      promptExitEditMode: function() {
        if(confirm(`You have unsaved changes. Are you sure you want to exit?`)) {
          this.exitEditMode();
          return true;
        } else return false;
      },

      promptExitCreateMode: function() {
        if(confirm(`You have unsaved changes. Are you sure you want to exit?`)) {
          this.exitCreateMode();
          return true;
        } else return false;
      }
        
    
    }
});