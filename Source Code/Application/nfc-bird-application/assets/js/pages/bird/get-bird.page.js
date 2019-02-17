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

        currentLogs: [],
    
        logCount: 0,

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

        currentBird: {}
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
        // Attach any initial data from the server.
        _.extend(this, SAILS_LOCALS);
    },
    mounted: async function() {
        this.currentBirds = await Cloud.getBird.with({includeConditions: true, includeNestsites: true, includeVisits: true, skip: 0, limit: this.pageSize});
        this.BirdCount = SAILS_LOCALS.BirdCount;
    },

    watch: {
      // whenever one of the filters changes, this function will run
      currentBirdFilter: function (_, _) {
        this.refresh();
      },
      currentSexFilter: function (_, _) {
        this.refresh();
      },
      currentBirdIdFilter: function (_, _) {
        this.refresh();
      },
      currentFatherFilter: function (_, _) {
        this.refresh();
      },
      currentMotherFilter: function (_, _) {
        this.refresh();
      },
      currentBreederFilter: function (_, _) {
        this.refresh();
      },
      currentNestSiteFilter: function (_, _) {
        this.refresh();
      },
      pageSize: function (_, _) {
        this.refresh();
      }
      
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

        case'hello3':
        this.modal = 'example3';
        break;

      default: this.modal = '';

        
    }
  },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {

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
          params.birdName = this.currentBreederFilter;
        }

        if(this.currentNestSiteFilter != null && this.currentNestSiteFilter != "") {
          params.birdName = this.currentNestSiteFilter;
        }


  
        params.skip = (this.currentPage - 1) * this.pageSize;
  
        params.limit = this.pageSize;
  
        this.currentLogs = await Cloud.getChangelog.with(params);
        this.logCount = await Cloud.countChangelog.with(params);
      },

        pageClick: async function(pageNum) {
            this.currentBirds = await Cloud.getBird.with({includeConditions: true, includeNestsites: true, includeVisits: true, skip: (pageNum - 1) * this.pageSize, limit: this.pageSize});
            this.BirdCount = await Cloud.countBird();
            this.currentPage = pageNum;
          },
          clearFilters: async function() {
            this.currentBirdFilter = "";
            this.currentBirdIdFilter = "";
            this.currentSexFilter = "";
            this.currentFatherFilter = "";
            this.currentMotherFilter = "";
            this.currentBreederFilter = "";
            this.currentNestSiteFilter = "";
            this.refresh();
          },



        clickOpenExampleModalButton3: async function(index) {
            this.currentBird = this.currentBirds[index];
            this.goto('/birds/hello3');
            // Or, without deep links, instead do:
            // ```
            // this.modal = 'example';
            // ```
          },

          closeExampleModal3: async function() {
              this.currentBird = {};
            this.goto('/birds');
            // Or, without deep links, instead do:
            // ```
            // this.modal = '';
            // ```
          },
        
    
    }
});