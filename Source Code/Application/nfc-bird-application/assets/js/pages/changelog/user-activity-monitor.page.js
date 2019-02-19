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

        currentDateFromFilter: "",

        currentDateToFilter: "",

        currentActionFilter: "",

        currentDataFilter: "",

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
          format: 'YYYY/MM/DD HH:mm:ss',
          maxDate: new Date(),
          showTodayButton: true,
          showClear: true,
          showClose: true,
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
    setInterval(this.refresh, 5000);
  },

  watch: {
    // whenever one of the filters changes, this function will run
    currentUserFilter: function (_, _) {
      if($("#username").data('locked') != 1) {
        this.refresh();
      }
    },
    currentActionFilter: function (_, _) {
      this.refresh();
    },
    currentDateFromFilter: function (_, _) {
      this.refresh();
    },
    currentDateToFilter: function (_, _) {
      this.refresh();
    },
    currentDataFilter: function (_, _) {
      this.refresh();
    },
    pageSize: function (_, _) {
      this.refresh();
    }
  
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
        params.dateFrom = new Date(this.currentDateFromFilter).getTime();
      }

      if(this.currentDateToFilter != null && this.currentDateToFilter != "") {
        params.dateTo = new Date(this.currentDateToFilter).getTime();
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
    },

    getLinkForUser: function(fullName) {
      return `/account/manage-users?initialFullNameFilter=${fullName}`;
    }
  }
});
