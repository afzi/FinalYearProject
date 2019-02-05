module.exports = {

    //DELETE -- DOESNT Get called by anything?

    friendlyName: 'View live bird visits',


    description: 'gets information on birds that have recently visited',


    exits: {

        success: {
            description: 'Bird data '
        },

        invalid: {
            responseType: 'badRequest'
        }
    },


    fn: async function(inputs, exits) {
        sails.log("I MADE IT HERE 1");
        var LIVEVIEWQUERY = `
      SELECT birds.id,birds.birdName, birds.leftRingID, birds.rightRingID 
      FROM nfcbirds.bird AS birds
      INNER JOIN nfcbirds.rfidtag AS tags
      ON birds.id = tags.birdID;`;

        //, visits.createdAt
        //   INNER JOIN nfcbirds.visit AS visits
        //   ON tags.nfcRFIDInternal = visits.ncfRFID
        //   WHERE visits.createdAt >= UNIX_TIMESTAMP(CURDATE())

        var rawResult = await sails.sendNativeQuery(LIVEVIEWQUERY);

        sails.log("I MADE IT HERE 2");
        sails.log(rawResult);
        // sails.log(rawResult[0].birdName);

        return exits.success(rawResult);
    }
};