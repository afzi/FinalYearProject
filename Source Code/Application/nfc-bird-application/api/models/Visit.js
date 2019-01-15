/**
 * Visit.js
 *
 * Visit made by birds to feeders
 */

module.exports = {
    attributes: {
        visitID: {
            type: 'number',
            required: true,
            unique: true,
        },
        feederID: {
            type: 'number',
            required: true,
            unique: true,
        },
        birdID: {
            modal: 'Bird',
            unique: true,
        },
        nfcRFIDInternal: {
            modal: 'RFIDTag',
            required: true,
            unique: true,
        },
    }
};