/**
	Generated by sails-inverse-model
	Date:Thu Jan 24 2019 13:21:47 GMT+0000 (Greenwich Mean Time)
*/

module.exports = {
    primaryKey: "birdID",

    attributes: {
        id: false,
        updatedAt: false,
        //createdOn provided by sails
        birdID: {
            type: 'number',
            autoIncrement: true,
            required: true
        },
        createdBy: {
            model: "user"
        },
        birdName: {
            type: "string",
            columnType: "varchar",
            maxLength: 20
        },
        studID: {
            type: "string",
            columnType: "varchar",
            maxLength: 20,
            unique: true
        },
        newStudID: {
            type: "string",
            columnType: "varchar",
            maxLength: 20,
            unique: true
        },
        leftRingID: {
            type: "string",
            columnType: "varchar",
            maxLength: 30
        },
        rightRingID: {
            type: "string",
            columnType: "varchar",
            maxLength: 30
        },
        sex: {
            type: "string",
            isIn: ["m", "f"]
        },
        layDate: {
            type: "string",
            columnType: "date"
        },
        hatchedWhere: {
            model: "nestsite"
        },
        hatchDate: {
            type: "string",
            columnType: "date"
        },
        incubationDays: {
            type: "number"
        },
        birdFledged: {
            type: "boolean"
        },
        fledgedWhere: {
            model: "nestsite"
        },
        releasedWhere: {
            model: "nestsite"
        },
        releasedWhen: {
            type: "string",
            columnType: "datetime"
        },
        groupName: {
            type: "string",
            columnType: "varchar",
            maxLength: 20
        },
        currentNestSite: {
            model: "nestsite"
        },
        motherName: {
            type: "string",
            columnType: "varchar",
            maxLength: 20
        },
        motherID: {
            model: "bird"
        },
        fatherName: {
            type: "string",
            columnType: "varchar",
            maxLength: 20
        },
        fatherID: {
            model: "bird"
        },
        secondFatherName: {
            type: "string",
            columnType: "varchar",
            maxLength: 20
        },
        secondFatherID: {
            model: "bird"
        },
        researcherNotes: {
            type: "string",
            columnType: "varchar",
            maxLength: 200
        },
        dateOut: { //death date
            type: "string",
            columnType: "date"
        }
    }
};