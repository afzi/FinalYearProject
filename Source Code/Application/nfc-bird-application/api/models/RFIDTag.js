/**
 * RFIDTag.js
 *
 * link betwwen rfid tag name printed on ring and internal chip id
 */

module.exports = {

    primaryKey: "nfcRFID",
    
    attributes: {
        id: false,
        editedBy: false,

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
            type: "ref",
            columnType: "varchar"
        },
        createdBy: {
            model: "user"
        }
    }
};