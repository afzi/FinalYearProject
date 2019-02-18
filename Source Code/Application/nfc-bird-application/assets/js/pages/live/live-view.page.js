parasails.registerPage('live-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        cloudSuccess: false,

        visitData: [],

        filteredData: [],

        visitCount: 0,

        pageSize: 15,

        currentPage: 1,

        search: ''
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
        }

    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
        pageClick: async function(pageNum) {
            this.visitData = await Cloud.liveView.with({ offset: (pageNum - 1) * this.pageSize, numOfRows: this.pageSize });
            //this.visitCount = this.visitData.visitCount;
            this.currentPage = pageNum;
        },

        filteredVisitData: async function(search) {
            this.visitData = await Cloud.liveView.with({ offset: 0, numOfRows: this.pageSize });
            this.filteredData = this.visitData.filter(visit => visit.birdName.indexOf(search) > -1);
        },

        refresh: async function() {

            this.visitData = await Cloud.liveView.with({ offset: (this.currentPage - 1) * this.pageSize, limit: numOfRows.pageSize });
        },

    }
});