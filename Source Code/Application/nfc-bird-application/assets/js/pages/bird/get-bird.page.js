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

        editBirdData: {},

        editBirdErrors: {},

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
          this.validateNestsite(newValue, 'fledgedWhere');
        }
      },

      'editBirdData.laidWhere': function (_, newValue) {
        if(this.isEditMode && $("#laidWhereEdit").data('locked') != 1) {
          this.validateNestsite(newValue, 'laidWhere');
        }
      },

      'editBirdData.hatchedWhere': function (_, newValue) {
        if(this.isEditMode && $("#hatchedWhereEdit").data('locked') != 1) {
          this.validateNestsite(newValue, 'hatchedWhere');
        }
      },

      'editBirdData.releasedWhere': function (_, newValue) {
        if(this.isEditMode && $("#releasedWhereEdit").data('locked') != 1) {
          this.validateNestsite(newValue, 'releasedWhere');
        }
      },

      'editBirdData.birdName': function (_, newValue) {
        if(this.isEditMode) {
          this.validateUniqueBirdName(newValue, this.editBirdData.id);
        }
      },

      'editBirdData.newCondition': function(_, newValue) {
        if(this.isEditMode) {
          this.validateNewCondition();
        }
      },

      'editBirdData.newBreedingSite': function(_, newValue) {
        if(this.isEditMode) {
          this.validateNewBreedingSite();
        }
      },

      'editBirdData.nfcRingID': function(_, newValue) {
        if(this.isEditMode && $("#releasedWhereEdit").data('locked') != 1) {
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

        case'SingleBird':
        this.modal = 'example3';
        break;

      default: this.modal = '';

        
    }
  },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
      submittedForm: async function() {
        this.syncing = true;
        await this.refresh();
        this.syncing = false;
        this.exitEditMode();
      },

      handleParsingFormEdit: function() {
        // Clear out any pre-existing error messages.
        this.formErrors = {};
        this.editValidationCounter = 0;
  
  
        var argins = this.editBirdData;

        this.validateNestsite(this.editBirdData.fledgedWhere);
        this.validateNestsite(this.editBirdData.releasedWhere);
        this.validateNestsite(this.editBirdData.laidWhere);
        this.validateNestsite(this.editBirdData.hatchedWhere);
        this.validateUniqueBirdName(this.editBirdData.birdName, this.editBirdData.id);
        this.validateNewCondition();
        this.validateNewBreedingSite();
        this.validateRFID();

        while(this.editValidationCounter < 8); // wait until validation has finished on all fields

  
        // If there were any issues, they've already now been communicated to the user,
        // so simply return undefined.  (This signifies that the submission should be
        // cancelled.)
        if (Object.keys(this.formErrors).length > 0) {
          return;
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

          validateNestsite: function(nestName, fieldName) {
            if(this.isEditMode) {
              if(!nestName || nestName === "") {
                this.editBirdErrors['fieldName'] = false;
              } else {
                Cloud.nestsiteExists.with({nestID: nestName}).then(result => {
                  this.editBirdErrors[fieldName] = !result;
                  });
                  this.editValidationCounter ++;
              }
            }

          },

          validateRFID: function() {
            if(this.isEditMode) {
              if(!this.editBirdData.nfcRingID || this.editBirdData.nfcRingID == "") this.editBirdErrors.nfcRingID = false;
              else {
                result = Cloud.rfidTagExists.with({nfcFriendlyName: this.editBirdData.nfcRingID}).then(result => {
                  this.editBirdErrors.nfcRingID = !result;
                  this.editValidationCounter ++;
                })
              }
            }
          },

          validateUniqueBirdName: function(birdName, thisBirdId) {
            if(this.isEditMode) {
              if(!birdName || birdName === "") {
                this.editBirdErrors.birdName = true;
              } else {
                result = Cloud.uniqueBirdName.with({echoName: birdName, excludeId: thisBirdId}).then(result => {
                  this.editBirdErrors.birdName = !result;
                  this.editValidationCounter ++;
                })
              }
            }
          },

          validateNewCondition: function() {
            if(this.isEditMode) {
              if(this.editBirdData.newCondition && this.editBirdData.newCondition != "" && (!this.editBirdData.newConditionDate || this.editBirdData.newConditionDate == '')) {
                this.editBirdErrors.newConditionDate = true;
              } else {
                this.editBirdErrors.newConditionDate = false;
                this.editValidationCounter ++;
              }
            }
          },

          validateNewBreedingSite: function() {
            if(this.isEditMode) {
              if(this.editBirdData.newBreedingSite && this.editBirdData.newBreedingSite != "" && (!this.editBirdData.newBreedingSiteDate || this.editBirdData.newBreedingSiteDate == '')) {
                this.editBirdErrors.newBreedingSiteDate = true;
              } else {
                this.editBirdErrors.newBreedingSiteDate = false;
                this.editValidationCounter ++;
              }
            }
          },

        clickOpenExampleModalButton3: async function(index) {
            this.currentBird = this.currentBirds[index];
            this.goto('/birds/SingleBird');
            // Or, without deep links, instead do:
            // ```
            // this.modal = 'example';
            // ```
          },

          closeSingleViewModal: function() {
            if(!this.isEditMode || (this.isEditMode && this.promptExitEditMode())) {
              this.currentBird = {};
              $('.modal').modal('hide');
              this.goto('/birds');
            }
            // Or, without deep links, instead do:
            // ```
            // this.modal = '';
            // ```
          },

      enterEditMode: async function() {
        this.editBirdData = $.extend({}, this.currentBird),
        this.editBirdData.hatchDate = this.currentBird.hatchDate ? new Date(this.currentBird.hatchDate * 1000) : null;
        this.editBirdData.layDate = this.currentBird.layDate ? new Date(this.currentBird.layDate * 1000) : null;
        this.editBirdData.releasedWhen = this.currentBird.releasedWhen ? new Date(this.currentBird.releasedWhen * 1000) : null;
        this.editBirdData.hatchedWhere = this.currentBird.hatchedWhere ? this.currentBird.hatchedWhere.nestID : "";
        this.editBirdData.fledgedWhere = this.currentBird.fledgedWhere ? this.currentBird.fledgedWhere.nestID : "";
        this.editBirdData.releasedWhere = this.currentBird.releasedWhere ? this.currentBird.releasedWhere.nestID : "";
        this.editBirdData.laidWhere = this.currentBird.laidWhere ? this.currentBird.laidWhere.nestID : "";
        this.editBirdData.newConditionDate = new Date();
        this.editBirdData.newBreedingSiteDate = new Date();
        this.editBirdErrors = {},
        this.isEditMode = true;
      },

      exitEditMode: function() {
        this.editBirdData = {}
        this.editBirdErrors = {},
        this.isEditMode = false;
      },

      promptExitEditMode: function() {
        if(confirm(`You have unsaved changes. Are you sure you want to exit?`)) {
          this.exitEditMode();
          return true;
        } else return false;
      }
        
    
    }
});