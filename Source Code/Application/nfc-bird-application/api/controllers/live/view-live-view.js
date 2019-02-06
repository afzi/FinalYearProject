module.exports = {


    friendlyName: 'View live-view',


    description: 'Display "live-view" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/live/live-view',
        },

        redirect: {
            description: 'Unknown Error',
            responseType: 'redirect'
        }

    },


    fn: async function(req, res) {
        return {};
    }


};