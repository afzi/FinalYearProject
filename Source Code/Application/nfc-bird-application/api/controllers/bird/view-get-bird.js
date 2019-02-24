module.exports = {


    friendlyName: 'View get-bird',


    description: 'Display "get-bird" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/bird/get-bird',
        },

        redirect: {
            description: 'Bird does not exists',
            responseType: 'redirect'
        }

    },


    fn: async function(req, res) {
        //   if (this.req.me) {
        //     throw {redirect: '/'};
        //   }

        return { title: 'Birds Table' };

    }


};