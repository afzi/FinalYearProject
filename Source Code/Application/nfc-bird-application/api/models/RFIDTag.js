/**
 * RFIDTag.js
 *
 * link betwwen rfid tag name printed on ring and internal chip id
 */

module.exports = {
    primaryKey: 'nfcRFID',

    attributes: {
        nfcRFID: {
            type: 'string',
            required: true,
            unique: true
        },
        nfcRFIDInternal: {
            type: 'string',
            required: true,
            unique: true,
        },
        birdId: {
            model: 'bird'
        }
    }
};