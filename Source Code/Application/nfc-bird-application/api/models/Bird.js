/**
 * Bird.js
 *
 * A Bird who is managed by the application.
 */

module.exports = {
    attributes: {
        birdName: { type: 'string', required: true, unique: true, },
        nfcRfid: { model: 'RFIDTag', unique: true, },
        createdBy: { model: 'User', required: true, },
        editeddBy: { model: 'User', required: true, },
        studID: { type: 'number', },
        newStudID: { type: 'number', },
        leftRingID: { type: 'string', },
        rightRingID: { type: 'string', },
        sex: { type: 'string', },
        motherName: { type: 'string', },
        motherBirdID: { model: 'Bird', },
        fatherName: { type: 'string' },
        fatherBirdID: { model: 'Bird', },
        secondFatherName: { type: 'string', },
        secondFatherBirdID: { model: 'Bird', },
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