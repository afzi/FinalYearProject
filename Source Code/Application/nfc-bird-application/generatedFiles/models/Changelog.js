/**
	Generated by sails-inverse-model
	Date:Thu Jan 24 2019 13:21:47 GMT+0000 (Greenwich Mean Time)
*/

module.exports = {
    autoPK: false,
    autoUpdatedAt: false,

    attributes: {
        logID: {
            type: 'number',
            autoIncrement: true,
            required: true,
            primaryKey: true
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
                // },
                // changedOn: {
                //     type: "string",
                //     columnType: "datetime",
                //     required: true
                // } AUTO MADE BY SAILS
        }
    }
};