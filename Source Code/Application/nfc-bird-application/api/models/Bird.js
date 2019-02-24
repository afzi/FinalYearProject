/**
	Generated by sails-inverse-model
	Date:Thu Jan 24 2019 13:21:47 GMT+0000 (Greenwich Mean Time)
*/

module.exports = {

    attributes: {
        //BirdID provided by sails ID
        //createdOn provided by sails
        //updatedOn provided by sails

        createdBy: {
            model: "user"
        },
        editedBy: {
            model: "user"
        },
        birdName: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20,
            unique: true
        },
        studID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20,
            unique: true
        },
        newStudID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20,
            unique: true
        },
        leftRingID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 30
        },
        rightRingID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 30
        },
        sex: {
            type: "ref",
            columnType: "varchar",
            isIn: ["male", "female", "unknown"]
        },
        isBreeder: {
            type: "ref",
            columnType: "varchar",
            isIn: ["yes", "no", "unknown"]
        },
        status: {
            type: "ref",
            columnType: "varchar",
            isIn: ["alive", "dead", "missing"]
        },
        layDate: {
            type: "ref",
            columnType: "bigint(20)"
        },
        laidWhere: {
            model: "nestsite"
        },
        hatchedWhere: {
            model: "nestsite"
        },
        hatchDate: { //USE THIS TO CALCULATE AGE
            type: "ref",
            columnType: "bigint(20)"
        },
        incubationDays: {
            type: "number"
        },
        fledgeDate: {
            type: "ref",
            columnType: "bigint(20)"
        },
        fledgedWhere: {
            model: "nestsite"
        },
        releasedWhere: {
            model: "nestsite"
        },
        releasedWhen: {
            type: "ref",
            columnType: "bigint(20)"
        },
        groupName: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        motherName: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        fatherName: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        secondFatherName: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        motherStudID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        fatherStudID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        secondFatherStudID: {
            type: "ref",
            columnType: "varchar",
            maxLength: 20
        },
        researcherNotes: {
            type: "ref",
            columnType: "varchar",
            maxLength: 200
        },
        //GENERATED OTF -- could save computation time by storing one time calcs (hatched, fledged, seenSinceFlegded)
        //birdStatus
        //seenSinceFledged
        //recentlySeen
        //lastSeenDate
        //deathDate
    }
};