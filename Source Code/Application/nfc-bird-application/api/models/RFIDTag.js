/**
 * RFIDTag.js
 *
 * link betwwen rfid tag name printed on ring and internal chip id
 */

module.exports = {

    primaryKey: "nfcRFID",
    
    attributes: {
        id: false,
        createdAt: false,
        updatedAt: false,

        birdID: {
            model: "bird"
        },
        nfcRFID: {
            type: "string",
            columnType: "varchar",
            unique: true,
            required: true
        },
        nfcRFIDInternal: {
            type: "string",
            columnType: "varchar",
            unique: true,
            required: true
        },
        colour: {
            type: "string",
            columnType: "varchar"
        }
    }
};