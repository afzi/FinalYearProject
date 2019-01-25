/**
	Generated by sails-inverse-model
	Date:Thu Jan 24 2019 13:21:47 GMT+0000 (Greenwich Mean Time)
*/

module.exports = {

    // primaryKey: "userID",

    attributes: {
        // id: false,
        updatedAt: false,
        createdAt: false,
        // userID: {
        //     type: 'number',
        //     autoIncrement: true,
        //     required: true
        // },
        username: {
            type: "string",
            columnType: "varchar",
            maxLength: 20,
            required: true
        },
        fullName: {
            type: "string",
            columnType: "varchar",
            maxLength: 40,
            required: true
        },
        password: {
            type: "string",
            columnType: "varchar",
            required: true
        },
        hasRead: {
            type: "boolean"
        },
        hasCreateEdit: {
            type: "boolean"
        },
        hasEditFull: {
            type: "boolean"
        },
        hasExportSimple: {
            type: "boolean"
        },
        hasExportFull: {
            type: "boolean"
        },
        hasAdmin: {
            type: "boolean"
        }
    }
};