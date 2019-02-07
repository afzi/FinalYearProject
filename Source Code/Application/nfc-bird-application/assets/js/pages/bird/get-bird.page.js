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

        BirdCount: 0,

        pageSize: 20,

        currentPage: 1,

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
        this.currentBirds = await Cloud.getBird.with({skip: 0, limit: this.pageSize});
        this.BirdCount = SAILS_LOCALS.BirdCount;
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

        pageClick: async function(pageNum) {
            this.currentBirds = await Cloud.getBird.with({skip: (pageNum - 1) * this.pageSize, limit: this.pageSize});
            this.BirdCount = await Cloud.countBird();
            this.currentPage = pageNum;
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