module.exports = {


    friendlyName: 'View create-bird',


    description: 'Display "create-bird" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/bird/create-bird',
        },

        redirect: {
            description: 'Bird already exists',
            responseType: 'redirect'
        }

    },


    fn: async function() {

        //   if (this.req.me) {
        //     throw {redirect: '/'};
        //   }

        return { title: 'Register New Bird' };

    }


};