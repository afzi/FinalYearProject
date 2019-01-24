/**
 * RFIDTag.js
 *
 * link betwwen rfid tag name printed on ring and internal chip id
 */

module.exports = {
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        birdID: {
            model: "bird"
        },
        nfcRFID: {
            type: "string",
            columnType: "varchar",
            unique: true,
            required: true,
            primaryKey: true
        },
        nfcRFIDInternal: {
            type: "string",
            columnType: "varchar",
            unique: true,
            required: true
        }
    }
};