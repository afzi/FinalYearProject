/**
 * RFIDTag.js
 *
 * link betwwen rfid tag name printed on ring and internal chip id
 */

module.exports = {
    attributes: {
        nfcRFID: {
            type: 'number',
            required: true,
            unique: true,
        },
        nfcRFIDInternal: {
            type: 'number',
            required: true,
            unique: true,
        },
    }
};