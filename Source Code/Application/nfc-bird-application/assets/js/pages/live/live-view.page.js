parasails.registerPage('live-view', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        cloudSuccess: false,

        visitData: [],

        visitCount: 0,

        pageSize: 20,

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
            console.log(this.visitData);
            console.log("hello");
            console.log(this.visitData.filter(visit => visit.birdName.indexOf(search) > -1));
            return this.visitData.filter(visit => visit.birdName.indexOf(search) > -1)
        }

    }
});