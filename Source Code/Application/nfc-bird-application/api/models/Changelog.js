/**
 * Changelog.js
 *
 * A log of changes made by users on birds
 */

module.exports = {
    attributes: {
        logID: {
            type: 'number',
            required: true,
            unique: true,
        },
        username: {
            model: 'User',
            required: true,
        },
        birdID: {
            model: 'Bird',
            required: true,
        },
        Changes: {
            type: 'string',
            required: true,
        },
    }
};