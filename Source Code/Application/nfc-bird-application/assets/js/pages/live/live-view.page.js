parasails.registerPage('live-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        cloudSuccess: false,

        visitData: {},

        visitCount: 0,

        pageSize: 15,

        currentPage: 1,

        search: '',

        timeFrom: '00:00',

        timeTo: '',

        timepickerOptions: {
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
            format: 'HH:mm',
            maxDate: new Date().getTime(),
            minDate: new Date().setHours(0, 0, 0, 0),
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
        this.visitData = await Cloud.liveView.with({ offset: 0, numOfRows: this.pageSize });
    },
    watch: {
        // whenever one of the filters changes, this function will run
        pageSize: function(_, _) {
            this.refresh();
        },
        search: function(_, _) {
            this.refresh();
        }

    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
        pageClick: async function(pageNum) {
            this.currentPage = pageNum;
            this.refresh();
        },

        // filterData: async function(search) {
        //     this.visitData = await Cloud.liveView.with({ offset: 0, numOfRows: this.pageSize });
        //     console.log(this.visitData);
        //     console.log("filterd");
        //     this.filteredData = this.visitData.filter(visit => visit.birdName.indexOf(search) > -1);
        //     console.log(this.filteredData);
        //     return this.filteredData;
        // },

        refresh: async function() {
            if (this.search == null || this.search == "") {
                this.visitData = await Cloud.liveView.with({ offset: (this.currentPage - 1) * this.pageSize, numOfRows: this.pageSize });
            } else {
                this.visitData = await Cloud.liveView.with({ searchTerm: this.search, offset: (this.currentPage - 1) * this.pageSize, numOfRows: this.pageSize });
            }
        },

        clearFilters: async function() {
            this.search = "";
            this.refresh();
        },

    }
});