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

        currentOldDataFilter: "",

        currentNewDataFilter: "",

        currentChangelog: {},

        currentSortItem: "createdAt",

        currentSortDirection: "DESC",

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
    this.currentDateFromFilter = moment().subtract(1, 'months')
  },
  mounted: async function() {
    this.refresh();
    setInterval(this.refresh, 5000);
  },

  watch: {
    // whenever one of the filters changes, this function will run
    currentUserFilter: function () {
      if($("#username").data('locked') != 1) {
        this.refresh();
      }
    },
    currentActionFilter: function () {
      this.refresh();
    },
    currentDateFromFilter: function () {
      this.refresh();
    },
    currentDateToFilter: function () {
      this.refresh();
    },
    currentOldDataFilter: function () {
      this.refresh();
    },
    currentNewDataFilter: function () {
      this.refresh();
    },
    pageSize: function () {
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

      if(this.currentOldDataFilter != null && this.currentOldDataFilter != "") {
        params.oldData = this.currentOldDataFilter;
      }

      if(this.currentNewDataFilter != null && this.currentNewDataFilter != "") {
        params.newData = this.currentNewDataFilter;
      }

      if(this.currentActionFilter != null && this.currentActionFilter != "") {
        params.action = this.currentActionFilter;
      }

      params.skip = (this.currentPage - 1) * this.pageSize;

      params.limit = this.pageSize;

      params.sortItem = this.currentSortItem;
      params.sortDirection = this.currentSortDirection;

      this.currentLogs = await Cloud.getChangelog.with(params);
      this.logCount = await Cloud.countChangelog.with(params);
    },

    pageClick: async function(pageNum) {
      this.currentPage = pageNum;
      this.refresh();
    },

    clearFilters: async function() {
      this.currentUserFilter = "";
      this.currentOldDataFilter = "";
      this.currentNewDataFilter = "";
      this.currentActionFilter = "";
      this.currentDateFromFilter = null;
      this.currentDateToFilter = null;
      this.refresh();
    },

    getLinkForUser: function(fullName) {
      return `/account/manage-users?initialFullNameFilter=${fullName}`;
    },

    selectCurrentChangelog: async function(index) {
      this.currentChangelog = this.currentLogs[index];
      // this.currentChangelog.oldData = this.currentChangelog.oldData.replace(/",/g, "\n");
      this.currentChangelog.oldData = this.currentChangelog.oldData.replace(/{/g, "");
      this.currentChangelog.oldData = this.currentChangelog.oldData.replace(/}/g, "");
      this.currentChangelog.oldData = this.currentChangelog.oldData.replace(/"/g, "");

      // this.currentChangelog.newData = this.currentChangelog.newData.replace(/",/g, "\n");
      this.currentChangelog.newData = this.currentChangelog.newData.replace(/{/g, "");
      this.currentChangelog.newData = this.currentChangelog.newData.replace(/}/g, "");
      this.currentChangelog.newData = this.currentChangelog.newData.replace(/"/g, "");
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
