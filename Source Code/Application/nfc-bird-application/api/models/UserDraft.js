/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
            minLength: 4,
            maxLength: 20,
        },
        password: {
            type: 'string',
            required: true,
            description: 'Securely hashed representation of the user\'s login password.',
            protect: true,
            example: '2$28a8eabna301089103-13948134nad'
        },
        firstName: {
            type: 'string',
            required: true,
            maxLength: 60,
            example: 'John'
        },
        lastName: {
            type: 'string',
            required: true,
            maxLength: 60,
            example: 'Cena'
        },
    }
};