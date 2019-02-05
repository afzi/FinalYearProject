module.exports = {


    friendlyName: 'View live-view',


    description: 'Display "live-view" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/live/live-view',
        },

        redirect: {
            description: 'Unknown Error',
            responseType: 'redirect'
        }

    },


    fn: async function(req, res) {
        sails.log("I MADE IT HERE 1");
        //     var LIVEVIEWQUERY = `
        // SELECT birds.id,birds.birdName, birds.leftRingID, birds.rightRingID, visits.createdAt 
        // FROM nfcbirds.bird AS birds
        // INNER JOIN nfcbirds.rfidtag AS tags
        // ON birds.id = tags.birdID
        // INNER JOIN nfcbirds.visit AS visits
        // ON tags.nfcRFIDInternal = visits.ncfRFID
        // WHERE visits.createdAt >= UNIX_TIMESTAMP(CURDATE());`;

        //     var rawResult = await sails.sendNativeQuery(LIVEVIEWQUERY);

        //     sails.log("I MADE IT HERE 2");
        //     sails.log(rawResult);

        //     return rawResult;

        return {};
    }


};