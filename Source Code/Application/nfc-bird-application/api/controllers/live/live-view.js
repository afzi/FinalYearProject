module.exports = {

    friendlyName: 'View live bird visits',


    description: 'gets information on birds that have recently visited',

    inputs: {
        skip: {
            required: false,
            type: 'number',
            description: 'How many records to skip (if used in pagination - where does the page begin)'
        },

        limit: {
            required: false,
            type: 'number',
            description: 'How many records to return (if used in pagination - what is the page size)'
        }
    },

    exits: {

        success: {
            description: 'Bird data '
        },

        invalid: {
            responseType: 'badRequest'
        }
    },


    fn: async function(inputs, exits) {
        var LIVEVIEWQUERY = `
            SELECT birds.id, birds.birdName, birds.leftRingID, birds.rightRingID, visits.createdAt
            FROM nfcbirds.bird AS birds
            INNER JOIN nfcbirds.rfidtag AS tags
            ON birds.id = tags.birdID
            INNER JOIN nfcbirds.visit AS visits
            ON tags.nfcRFIDInternal = visits.nfcRFID
            WHERE visits.createdAt >= UNIX_TIMESTAMP(CURDATE());`;
            
        var rawResult = await sails.sendNativeQuery(LIVEVIEWQUERY);
        var parsedResult = [];
        var rows = rawResult.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            row.createdAt = TimeUtil.unixToDate(row.createdAt);
            parsedResult.push(row)
        }

        return exits.success(parsedResult);
    }
};