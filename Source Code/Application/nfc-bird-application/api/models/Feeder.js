/**
 * Feeder.js
 *
 * feeders that are tracked by the system
 */

module.exports = {
    attributes: {
        feederID: {
            type: 'number',
            required: true,
            unique: true,
        },
        createdBy: {
            model: 'User',
            required: true,
            unique: true,
        },
        feederDescription: {
            type: 'string',
        },
    }
};