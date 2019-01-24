/**
	Generated by sails-inverse-model
	Date:Thu Jan 24 2019 13:21:47 GMT+0000 (Greenwich Mean Time)
*/

module.exports = {

    primaryKey: "nestID",

    attributes: {
        id: false,
        updatedAt: false,
        createdAt: false,
        nestID: {
            type: "string",
            columnType: "varchar",
            maxLength: 10,
            required: true,
            unique: true
        },
        createdBy: {
            model: "user"
        },
        nestDescription: {
            type: "string",
            columnType: "varchar",
            maxLength: 200
        }
    }
};