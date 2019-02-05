module.exports = {


  friendlyName: 'View import rfid',


  description: 'Display "Import rfid" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/rfidtag/import-rfid'
    }

  },


  fn: async function () {
    var numRfids = await RFIDTag.count();

    // Respond with view.
    return {rfidCount: numRfids};

  }


};
