/**
 * Bird.js
 *
 * A Bird who is managed by the application.
 */

module.exports = {
    attributes: {
        birdName: {
            type: 'string',
            unique: true,
        },
        nfcRFID: {
            model: 'RFIDTag',
            unique: true,
        },
        createdBy: {
            model: 'User',
            required: true,
        },
        editedBy: {
            model: 'User',
            required: true,
        },
        studID: {
            type: 'number',
        },
        newStudID: {
            type: 'number',
        },
        leftRingID: {
            type: 'string',
        },
        rightRingID: {
            type: 'string',
        },
        sex: {
            type: 'string',
        },
        motherName: {
            type: 'string',
        },
        fatherName: {
            type: 'string',
        },
        secondFatherName: {
            type: 'string',
        },
        researcherNotes: {
            type: 'string',
        },
        layDate: {
            type: 'ref',
            columnType: 'DATETIME',
        },
        hatchDate: { //if not set, Hatched = False
            type: 'ref',
            columnType: 'DATETIME',
        },
        incubationDays: {
            type: 'number',
        },
        whereHatched: {
            type: 'string',
        },
        whereFledged: {
            type: 'string',
        },
        whenFledged: { //if not set, Fledged = false
            type: 'ref',
            columnType: 'DATETIME',
        },
        whereReleased: {
            type: 'string',
        },
        whenReleased: {
            type: 'ref',
            columnType: 'DATETIME',
        },
        groupName: {
            type: 'string',
        },
        currentNestSite: {
            type: 'string',
        },
        //GENERATED OTF -- could save computation time by storing one time calcs (hatched, fledged, seenSinceFlegded)
        //birdStatus
        //seenSinceFledged
        //recentlySeen
        //lastSeenDate
        //deathDate
    },
};