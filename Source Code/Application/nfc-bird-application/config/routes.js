/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
    'GET /': { action: 'view-homepage-or-redirect' },
    'GET /welcome/:unused?': { action: 'dashboard/view-welcome' },

    'GET /faq': { view: 'pages/faq' },
    'GET /legal/terms': { view: 'pages/legal/terms' },
    'GET /legal/privacy': { view: 'pages/legal/privacy' },

    'GET /signup': { action: 'entrance/view-signup' },

    'GET /login': { action: 'entrance/view-login' },
    'GET /password/new': { action: 'entrance/view-new-password' },

    'GET /bird/register': { action: 'bird/view-create-bird' },
    'GET /nestsites': { action: 'nestsite/view-create-nestsite' },

    'GET /account': { action: 'account/view-account-overview' },

    'GET /birds': { action: 'bird/view-get-bird' },

    'GET /birds/single': { action: 'bird/view-get-bird' },

    'GET /account/password': { action: 'account/view-edit-password' },
    'GET /account/profile': { action: 'account/view-edit-profile' },
    'GET /account/manage-users': { action: 'account/view-manage-users' },

    'GET /rfidtag': { action: 'rfidtag/view-import-rfid' },

    'GET /live/view': { action: 'live/view-live-view' },
    'GET /changelog/user-activity-monitor': { action: 'changelog/view-user-activity-monitor' },

    'GET /export': { action: 'export-data' },
    'GET /birds/export': { action: 'bird/export-data-bird-simple' },


    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
    '/terms': '/legal/terms',
    '/logout': '/api/v1/account/logout',


    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
    // …


    //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
    //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
    //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
    // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
    // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
    '/api/v1/account/logout': { action: 'account/logout' },
    'PUT   /api/v1/account/update-password/:userId?': { action: 'account/update-password' },
    'PUT   /api/v1/account/update-profile': { action: 'account/update-profile' },

    'PUT   /api/v1/entrance/login': { action: 'entrance/login' },


    'GET   /api/v1/bird/unique-bird-name': { action: 'bird/unique-bird-name' },
    'GET   /api/v1/bird': { action: 'bird/get-bird' },

    'GET   /api/v1/rfidtag/rfid-tag-exists': { action: 'rfidtag/rfid-tag-exists' },
    'GET   /api/v1/rfidtag': { action: 'rfidtag/get-rfid' },
    'GET   /api/v1/rfidtag/count': { action: 'rfidtag/count-rfid' },

    'DELETE   /api/v1/rfidtag': { action: 'rfidtag/delete-rfid' },

    'GET   /api/v1/nestsite/nestsite-exists': { action: 'nestsite/nestsite-exists' },
    'GET   /api/v1/nestsite': { action: 'nestsite/get-nestsite' },
    'GET   /api/v1/nestsite/count': { action: 'nestsite/count-nestsite' },


    'GET   /api/v1/user': { action: 'account/get-user' },
    'GET   /api/v1/user/count': { action: 'account/count-user' },
    'GET   /api/v1/user/username-exists': { action: 'account/username-exists' },

    'DELETE   /api/v1/user': { action: 'account/delete-user' },

    'POST  /api/v1/account/signup': { action: 'account/signup' },

    'PUT  /api/v1/account/edit-user': { action: 'account/edit-user' },


    'POST  /api/v1/nestsite': { action: 'nestsite/create-nestsite' },

    'PUT   /api/v1/nestsite': { action: 'nestsite/edit-nestsite' },

    'DELETE   /api/v1/nestsite': { action: 'nestsite/delete-nestsite' },


    'POST  /api/v1/bird': { action: 'bird/create-bird' },
    'PUT  /api/v1/bird': { action: 'bird/edit-bird' },
    'GET /api/v1/bird/count': { action: 'bird/count-birds' },

    'POST  /api/v1/entrance/update-password-and-login': { action: 'entrance/update-password-and-login' },

    'POST /api/v1/rfidtag': { action: 'rfidtag/import-rfid' },

    'GET /api/v1/live': { action: 'live/live-view' },
    'GET /api/v1/bird/get-single-bird-visit': { action: 'bird/get-single-bird-visit' },

    'GET /api/v1/changelog': { action: 'changelog/get-changelog' },
    'GET /api/v1/changelog/count': { action: 'changelog/count-changelog' },

    'PUT /api/v1/lock': { action: 'lock/try-acquire-renew-lock' },

    'GET /api/v1/export': { action: 'export-data' },
    'GET /api/v1/bird/export': { action: 'bird/export-data-bird-simple' },


};