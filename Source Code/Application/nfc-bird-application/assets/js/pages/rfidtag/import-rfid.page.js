parasails.registerPage('import-rfid', {
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

    csvValid: false,

    statusText: '',

    ringidFilter: "",

    csvParsed: [],

    currentRfids: [],

    rfidCount: 0,

    pageSize: 15,

    currentPage: 1,

    currentSortItem: 'nfcRFID',

    currentSortDirection: 'ASC'
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    $('[data-toggle="tooltip"]').tooltip();
    this.refresh();
  },

  watch: {
    // whenever one of the filters changes, this function will run
    pageSize: function (_, _) {
      this.refresh();
    },

    ringidFilter: function(_, _) {
      if($("#nfcRFIDFilter").data('locked') != 1) {
        this.refresh();
      }
    },

//   ringidFilter: function(_, _) {
//     this.refresh();
// },
    
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    submittedForm: async function(result) {
      this.syncing = false;
      this.statusText = `Successfully imported ${result.success} rings.`;

      if(result.skipped > 0) {
        this.statusText += ` ${result.skipped} rings were skipped due to non-unique attributes (either short or long ID)`;
      }

      this.refresh();
      
      // window.location = '/';
    },

    pageClick: async function(pageNum) {
      this.currentPage = pageNum;
      this.refresh();
    },

    clearFilters: async function() {
      this.ringidFilter = "";
  },

    refresh: async function() {
      var params = {}
      if(this.ringidFilter) {
        params.nfcRFID = this.ringidFilter;
      }
      params.skip = (this.currentPage - 1) * this.pageSize
      params.limit = this.pageSize;
      params.sortItem = this.currentSortItem;
      params.sortDirection = this.currentSortDirection;
      this.currentRfids = await Cloud.getRfid.with(params);
      this.rfidCount = await Cloud.countRfid.with(params);
    },

    startSubmit: async function(result) {
      this.syncing = true;
      this.csvValid = false;
      this.statusText = `Importing...`;
    },

    handleParsingForm: function() {
      // Clear out any pre-existing error messages.
      this.formErrors = {};


      var argins = {};

      if(this.csvParsed && this.csvParsed.length > 0) {
        argins.csv = {
          values: this.csvParsed
        }
      } else {
        this.formErrors.csvUpload = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    validateCsv: function(parsed) {
      this.statusText = "Validating...";

      if(!parsed.data[0] || parsed.meta.fields.length != 3 || !(parsed.meta.fields[0] == "short" && parsed.meta.fields[1] == "long" && parsed.meta.fields[2] == "colour")) {
        this.statusText = "CSV invalid";
        Vue.set(this.formErrors, 'csvUpload', true);
        this.csvValid = false;
      } else {
        this.csvParsed = parsed.data;
        Vue.set(this.formErrors, 'csvUpload', false);
        this.csvValid = true;
        this.statusText = `Ready to upload ${this.csvParsed.length} RFID rings`;
      }

    },

    parseCsv: function(e) {
      if(e.target && e.target.files && e.target.files[0]) {
        this.csvValid = false;
        Vue.set(this.formErrors, 'csvUpload', false);
        this.statusText = "Parsing..."; 

        // var reader = new FileReader();

        // reader.onload = (file) => {
        //   papaparse.parse(file, this.validateCsv);
        // }

        papaparse.parse(e.target.files[0], {
          complete: this.validateCsv,
          error: () => {
            this.formErrors.csvUpload = true;
            this.statusText = "CSV invalid";
          },
          header: true,
          skipEmptyLines: true
        });
      }
    },

    promptDeleteRing: async function(index) {
      if(confirm(`Are you sure you want to delete ring ${this.currentRfids[index].nfcRFID}?`)) {
        await Cloud.deleteRfid(this.currentRfids[index].nfcRFID);
        this.refresh();
      }
    },

    canEditThisRfid: function(index) {
      if(this.me.hasEditFull) return true;

      if(this.me.hasCreateEdit) {
        var editRfid = this.currentRfids[index];
        return editRfid.createdBy.id == this.me.id;
      }

      return false;
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
