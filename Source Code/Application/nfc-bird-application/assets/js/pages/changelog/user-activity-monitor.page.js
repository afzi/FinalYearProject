parasails.registerPage('user-activity-monitor', {
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
    
        currentLogs: [],
    
        logCount: 0,
    
        pageSize: 20,
    
        currentPage: 1,

        currentUserFilter: "",

        currentDateFromFilter: null,

        currentDateToFilter: null,

        currentActionFilter: "",

        currentDataFilter: ""
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

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    refresh: async function() {


      var params = {};
      if(this.currentDateFromFilter == null || this.currentDateFromFilter == "") {
        var date = new Date();
        date.setMonth(date.getMonth() - 12);
        params.dateFrom = date.getTime();
      } else {
        params.dateFrom = this.currentDateFromFilter;
      }

      if(this.currentDateToFilter != null && this.currentDateToFilter != "") {
        params.dateTo = this.currentDateToFilter;
      }

      if(this.currentUserFilter != null && this.currentUserFilter != "") {
        params.username = this.currentUserFilter;
      }

      if(this.currentDataFilter != null && this.currentDataFilter != "") {
        params.data = this.currentDataFilter;
      }

      if(this.currentActionFilter != null && this.currentActionFilter != "") {
        params.action = this.currentActionFilter;
      }

      params.skip = (this.currentPage - 1) * this.pageSize;

      params.limit = this.pageSize;

      this.currentLogs = await Cloud.getChangelog.with(params);
      this.logCount = await Cloud.countChangelog.with(params);
    },

    pageClick: async function(pageNum) {
      this.currentPage = pageNum;
      this.refresh();
    },

    clearFilters: async function() {
      this.currentUserFilter = "";
      this.currentDataFilter = "";
      this.currentActionFilter = "";
      this.currentDateFromFilter = null;
      this.currentDateToFilter = null;
      this.refresh();
    }
  }
});
