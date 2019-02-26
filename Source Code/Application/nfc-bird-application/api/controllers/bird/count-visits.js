module.exports = {

    friendlyName: 'View live bird visits',


    description: 'gets information on birds that have recently visited',

    inputs: {
        birdName: {
            required: true,
            type: 'string',
            description: 'term to search on',
            default: ""
        },
        offset: {
            required: true,
            type: 'number',
            description: 'How many records to skip (if used in pagination - where does the page begin)'
        },

        numOfRows: {
            required: true,
            type: 'number',
            description: 'How many records to return (if used in pagination - what is the page size)'
        },
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
        var COUNTQUERY = `SELECT COUNT(*) AS cnt `;
        var DATAQUERY = `SELECT visits.createdAt `;
        var FILTERING = `FROM nfcbirds.bird AS birds
        INNER JOIN nfcbirds.rfidtag AS tags
        ON birds.id = tags.birdID
        INNER JOIN nfcbirds.visit AS visits
        ON tags.nfcRFIDInternal = visits.nfcRFID
        AND birds.birdName = $1 
        ORDER BY visits.createdAt DESC`;
        COUNTQUERY += FILTERING + " ;";
        DATAQUERY += FILTERING + " LIMIT $2 OFFSET $3;";
        

        // GET COUNT FOR PAGINATION
        var rawCount = await sails.sendNativeQuery(COUNTQUERY,[inputs.birdName]);
        console.log("we are here");

        // GET DATA FOR TABLE
        var rawResult = await sails.sendNativeQuery(LIVEVIEWQUERY, [inputs.birdName, inputs.numOfRows, inputs.offset]);
        var parsedResult = [];
        var rows = rawResult.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            parsedResult.push(row)
        }
        return exits.success({visits: parsedResult, count: rawCount.rows[0].cnt});
    }
};