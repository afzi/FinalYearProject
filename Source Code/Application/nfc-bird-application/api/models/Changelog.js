/**
	Generated by sails-inverse-model
	Date:Thu Jan 24 2019 13:21:47 GMT+0000 (Greenwich Mean Time)
*/

module.exports = {

    primaryKey: "logID",

    attributes: {
        id: false,
        updatedAt: false,
        //changedOn provided by sails createdAt
        
        logID: {
            type: 'number',
            autoIncrement: true,
            required: true,
        },
        userID: {
            model: "user"
        },
        birdID: {
            model: "bird"
        },
        changes: {
            type: "string",
            columnType: "varchar",
            maxLength: 20,
            required: true
        }
    }
};