/**
 * Permission.js
 *
 * A permissions for user who can log in to this application.
 */

module.exports = {
    attributes: {
        username: {
            model: 'User',
            required: true,
            unique: true,
        },
        hasRead: {
            type: 'boolean',
        },
        hasCreation: {
            type: 'boolean',
        },
        hasExport: {
            type: 'boolean',
        },
        hasAdmin: {
            type: 'boolean',
        },
    }
};