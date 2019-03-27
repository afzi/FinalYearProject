parasails.registerPage('full-bird', {

    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
        modal: '',
        pageLoadedAt: Date.now(),
        cloudSuccess: false,
        // result: {},

        currentBirds: [],

        formData: { /* … */ },

        BirdCount: 0,

        pageSize: 20,

        visitCount: 0,

        visitPageSize: 3,

        currentPage: 1,

        visitCurrentPage: 1,

        currentBird: {},

        isEditMode: false,

        isCreateMode: false,

        editBirdData: {},

        createBirdData: {},

        editBirdErrors: {},

        createBirdErrors: {},

        editValidationCounter: 0,

        // Syncing / loading state
        syncing: false,

        // Server error state
        cloudError: '',

        // Success state when form has been submitted
        cloudSuccess: false,


    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
        // Attach any initial data from the server.
        _.extend(this, SAILS_LOCALS);
    },

 

    watch: {
        
       
        pageSize: function() {
            this.currentPage = 1;
            this.$refs.paginate.selected = 1;
            this.refresh();
        },


       

        

        

    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
       

        submittedFormEdit: async function() {
            this.syncing = true;
            await this.refresh();
            if (this.isEditMode) {
                this.currentBird = (await Cloud.getBird.with({ id: this.editBirdData.id, includeVisits: true, includeNestsites: true, includeConditions: true }))[0]
                this.exitEditMode();
            }
            this.syncing = false;
        },

        submittedFormCreate: async function() {
            this.syncing = true;
            await this.refresh();
            if (this.isEditMode) {
                this.closeCreateBirdModal(false);
            }
            this.syncing = false;
        },

        

        pageClick: async function(pageNum) {
            this.currentPage = pageNum;
            this.refresh();
        },


        selectIndexFormData: async function(index) {
            this.formErrors = {};
            this.formData = this.currentBirds[index];
          },


        visitPageClick: async function(pageNum) {
            this.visitCurrentPage = pageNum;
            var temp = await Cloud.getSingleBirdVisit.with({ birdName: this.currentBird.birdName, offset: (this.visitCurrentPage - 1) * this.visitPageSize, numOfRows: this.visitPageSize });
            this.currentBird.visitHistory = temp.visits;
            this.visitCount = temp.count;
        },

  

       

     

  

     

       


    }
});