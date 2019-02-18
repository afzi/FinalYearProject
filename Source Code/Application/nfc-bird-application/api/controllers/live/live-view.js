module.exports = {

    friendlyName: 'View live bird visits',


    description: 'gets information on birds that have recently visited',

    inputs: {
        searchTerm: {
            required: false,
            type: 'string',
            description: 'term to search on',
            default: ""
        },
        offset: {
            required: false,
            type: 'number',
            description: 'How many records to skip (if used in pagination - where does the page begin)'
        },

        numOfRows: {
            required: false,
            type: 'number',
            description: 'How many records to return (if used in pagination - what is the page size)'
        },
        timeFrom:{
            required:false,
            type:'string',
            description:'Time from which visits should be displayed for that date'
        },
        timeTo:{
            required:false,
            type:'string',
            description:'Time to which visits should be displayed for that date'
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
            WHERE visits.createdAt >= UNIX_TIMESTAMP(concat(curdate(), $1))
            AND visits.createdAt <= UNIX_TIMESTAMP(concat(curdate(), $2)) `;
        if (inputs.searchTerm != null) { LIVEVIEWQUERY += " AND birds.birdName LIKE $3 "; }
        LIVEVIEWQUERY += `ORDER BY visits.createdAt DESC
            LIMIT $4 OFFSET $5;`;

        var rawResult = await sails.sendNativeQuery(LIVEVIEWQUERY, [" "+inputs.timeFrom+":00"," "+inputs.timeTo+":00","%" + inputs.searchTerm + "%", inputs.numOfRows, inputs.offset]);
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