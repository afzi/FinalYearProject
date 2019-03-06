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

    currentPage: 1
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
  },

  watch: {
    // whenever one of the filters changes, this function will run
    pageSize: function (_, _) {
      this.refresh();
    },

    ringidFilter: function(_, _) {
          this.currentPage = 1;
          this.$refs.paginate.selected = 1;
          this.refresh();
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

      this.currentRfids = await Cloud.getRfid.with({skip:  (this.currentPage - 1) * this.pageSize, limit: this.pageSize});
      this.rfidCount = await Cloud.countRfid();
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
        this.formErrors.csvUpload = true;
        this.csvValid = false;
      } else {
        this.csvParsed = parsed.data;
        this.formErrors.csvUpload = false;
        this.csvValid = true;
        this.statusText = `Ready to upload ${this.csvParsed.length} RFID rings`;
      }

    },

    parseCsv: function(e) {
      this.csvValid = false;
      this.formErrors.csvUpload = false;
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
    },

    promptDeleteRing: async function(index) {
      if(confirm(`Are you sure you want to delete ring ${this.currentRfids[index].nfcRFID}?`)) {
        await Cloud.deleteRfid(this.currentRfids[index].nfcRFID);
        this.refresh();
      }
    }
  }
});
