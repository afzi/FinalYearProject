module.exports = {


    friendlyName: 'Count all registered RFID tags, based on filters',
  
  
    description: 'Returns a count of RFID objects matching the given criteria',
 
  
    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
        var COUNTQUERY = `
            SELECT COUNT(*)
            FROM nfcbirds.visit
            WHERE visits.createdAt >= UNIX_TIMESTAMP(CURDATE());`;

        var rawResult = await sails.sendNativeQuery(COUNTQUERY);
        sails.log(rawResult);
        var parsedResult = [];
        var rows = rawResult.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            parsedResult.push(row)
        }
  
        return rawResult;
    }
  
  
  };
  
  