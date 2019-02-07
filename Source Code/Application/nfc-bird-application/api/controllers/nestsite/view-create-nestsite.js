module.exports = {


    friendlyName: 'View create nestsite',


    description: 'Display "Create nestsite" page.',


    exits: {

        success: {
            viewTemplatePath: 'pages/nestsite/create-nestsite'
        }

    },


    fn: async function() {

        // Respond with view.
        return { title: 'Manage Nest Site' };

    }


};