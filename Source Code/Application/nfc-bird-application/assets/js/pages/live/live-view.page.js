parasails.registerPage('live-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        cloudSuccess: false,

        visitData: {},

        visitCount: 0,

        dayUpdatedVisitCount: 0,

        dayInitalVisitCount: 0,

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
        this.dayInitalVisitCount = raw.count;
        this.checkNew();
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
            this.newVisits = false;
            this.dayInitalVisitCount = this.dayUpdatedVisitCount;
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
            this.newVisits = false;
            this.dayInitalVisitCount = this.dayUpdatedVisitCount;
        },

        clearFilters: async function() {
            this.search = "";
            this.timeFrom = "00:00";
            this.timeTo = "23:59";
            this.refresh();
        },

        checkNew: async function(dayInitalVisitCount) {
            var self = this;
            setInterval(async function(dayInitalVisitCount) {
                var temp = await Cloud.liveView.with({ timeFrom: '00:00', timeTo: '23:59', offset: 0, numOfRows: 0 });
                self.dayUpdatedVisitCount = temp.count;
                if (self.dayUpdatedVisitCount > self.dayInitalVisitCount) {
                    self.$nextTick(function(){
                    self.diff = self.dayUpdatedVisitCount - self.dayInitalVisitCount;
                    self.newVisits = true;
                    })
                    
                }
            }, 5000, dayInitalVisitCount); //TODO: change to 1 min for production : 60000 



        },

        goToBird: function(birdName) {
            this.goto(`/birds?initialBirdNameFilter=${birdName}`);
          },

        exportToExcel: async function() {
        var fs = window.fs;

        fs.mkdir('/home', function() {
            fs.writeFile('/home/hello-world.txt', 'Hello world!\n', function() {
                fs.readFile('/home/hello-world.txt', 'utf-8', function(err, data) {
                    console.log(data);
                });
            });
        });
            // var Readable = window.readable;
            // var s = new Readable();
            // s._read = function noop() {}; // redundant? see update below
            // s.push("your text here\r\n")
            // s.push("next line text\r\n");
            // // s.push(null);

            // // res.attachment('test.csv');
            // // -> response header will contain:
            // //   Content-Disposition: attachment
            // s.pipe(SAILS_LOCALS.res.attachment('file.txt'))
            // // res.download(data,'fileName.csv');
            // SAILS_LOCALS.res.send()

            // // console.log(SAILS_LOCALS.res);
            // // console.log(res);
            // // console.log(this.res);

        }
    }
});