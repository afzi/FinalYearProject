parasails.registerPage('live-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        cloudSuccess: false,

        visitData: {},

        visitCount: 0,

        diff: 0,

        newVisits: false,

        pageSize: 15,

        currentPage: 1,

        search: '',

        timeFrom: '00:00',

        timeTo: '23:59',

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
            minDate: new Date().setHours(0, 0, 0, 0),
            showTodayButton: false,
            showClear: false,
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
        var raw = await Cloud.liveView.with({ timeFrom: this.timeFrom, timeTo: this.timeTo, offset: 0, numOfRows: this.pageSize });
        this.visitData = raw.visits;
        this.visitCount = raw.count;
        this.checkNew(raw.count);
    },
    watch: {
        // whenever one of the filters changes, this function will run
        pageSize: function(_, _) {
            this.refresh();
        },
        search: function(_, _) {
            this.refresh();
        },
        timeFrom: function(_, _) {
            this.refresh();
        },
        timeTo: function(_, _) {
            this.refresh();
        },
        newVisits: function(_, _) {
            console.log("hello");
        },
        diff: function(_, _) {
            console.log("hello2");
        },

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
                var raw = await Cloud.liveView.with({ timeFrom: this.timeFrom, timeTo: this.timeTo, offset: (this.currentPage - 1) * this.pageSize, numOfRows: this.pageSize });
                this.currentPage = 1;
                this.visitData = raw.visits;
                this.visitCount = raw.count;
            } else {
                var raw = await Cloud.liveView.with({ timeFrom: this.timeFrom, timeTo: this.timeTo, searchTerm: this.search, offset: (this.currentPage - 1) * this.pageSize, numOfRows: this.pageSize });
                this.currentPage = 1;
                this.visitData = raw.visits;
                this.visitCount = raw.count;
            }
            // if(this.search == null && (this.timeFrom == "00:00" && this.timeTo == "23:59")){
            //     this.visitCount = await Visit.count();
            // } else if(fromPageClick){
            //     this.visitCount = await Visit.count();
            // }
            // if(vCount == -1){
            //     var temp = await Cloud.liveView.with({timeFrom: this.timeFrom, timeTo: this.timeTo, searchTerm: this.search, offset: (this.currentPage - 1) * this.pageSize, numOfRows: Number.MAX_SAFE_INTEGER });
            //     this.visitCount = temp.length;}
        },

        clearFilters: async function() {
            this.search = "";
            this.timeFrom = "00:00";
            this.timeTo = "23:59";
            this.refresh();
        },

        checkNew: async function(dayInitalVisitCount) {
            setInterval(async function(dayInitalVisitCount) {
                var temp = await Cloud.liveView.with({ timeFrom: '00:00', timeTo: '23:59', offset: 0, numOfRows: 0 });
                dayUpdatedVisitCount = temp.count;
                if (this.dayUpdatedVisitCount > dayInitalVisitCount) {
                    //TODO: notify user that new records exisit and make it work
                    this.diff = dayUpdatedVisitCount - dayInitalVisitCount;
                    this.newVisits = true;
                }
            }, 5000, dayInitalVisitCount); //1 min is 60000 



        },

        exportToExcel: async function() {
            console.log(this.res);
            var file = await Cloud.exportToExcel.with({ res: this.res });;

            if (!file) { throw 'notFound'; }

            this.res.attachment(file.downloadName);
            var downloading = await sails.startDownload(file.uploadFd);
            return exits.success(downloading);

        }
    }
});