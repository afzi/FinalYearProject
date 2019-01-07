/**
 * Bird.js
 *
 * A Bird who is managed by the application.
 */

module.exports = {
    attributes: {
        birdID: { type: 'number', required: true, unique: true, },
        birdName: { type: 'string', required: true, unique: true, },
        RFIDFriendlyName: { type: 'string', unique: true, },
        createdBy: { type: 'number', required: true, },
        createdOn: { type: 'ref', required: true, columnType: 'DATETIME', },
        studID: { type: 'number', unique: true, },
        newStudID: { type: 'number', unique: true, },
        leftRingID: { type: 'string', },
        rightRingID: { type: 'string', },
        sex: { type: 'boolean', },
        motherName: { type: 'string', },
        motherBirdID: { type: 'number', },
        fatherName: { type: 'string' },
        fatherBirdID: { type: 'number', },
        secondFatherName: { type: 'string', },
        secondFatherBirdID: { type: 'number', },
        researcherNotes: { type: 'string', },
        layDate: { type: 'ref', columnType: 'DATETIME', },
        hatchDate: { type: 'ref', columnType: 'DATETIME', }, //if not set, Hatched = False
        incubationDays: { type: 'number', },
        whereHatched: { type: 'string', },
        whereFledged: { type: 'string', },
        whenFledged: { type: 'ref', columnType: 'DATETIME', }, //if not set, Fledged = false
        whereReleased: { type: 'string', },
        whenReleased: { type: 'ref', columnType: 'DATETIME', },
        groupName: { type: 'string', },
        currentNestSite: { type: 'string', },
        //GENERATED OTF -- could save computation time by storing one time calcs (hatched, fledged, seenSinceFlegded)
        //birdStatus
        //seenSinceFledged
        //recentlySeen
        //lastSeenDate
        //deathDate
        dateOut: { type: 'ref', columnType: 'DATETIME', },
    },
};