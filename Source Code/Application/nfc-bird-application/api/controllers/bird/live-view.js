module.exports = {


    friendlyName: 'View live bird visits',


    description: 'gets information on birds that have recently visited',


    inputs: {

    },


    exits: {

        success: {
            description: 'Bird data ',
            viewTemplatePath: 'pages/bird/live-view'
        },

        invalid: {
            responseType: 'badRequest'
        }
    },


    fn: async function() {
        console.log("I MADE IT HERE 1");
        var LIVEVIEWQUERY = `
      SELECT birds.id,birds.birdName, birds.leftRingID, birds.rightRingID, visits.createdAt 
      FROM nfcbirds.bird AS birds
      INNER JOIN nfcbirds.rfidtag AS tags
      ON birds.id = tags.birdID
      INNER JOIN nfcbirds.visit AS visits
      ON tags.nfcRFIDInternal = visits.ncfRFID
      WHERE visits.createdAt >= UNIX_TIMESTAMP(CURDATE());`;

        var rawResult = await sails.sendNativeQuery(LIVEVIEWQUERY);

        console.log("I MADE IT HERE 2");
        console.log(rawResult);

        return exits.success(rawResult);
    }
};