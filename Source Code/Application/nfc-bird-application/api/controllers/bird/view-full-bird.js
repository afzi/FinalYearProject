module.exports = {


    friendlyName: 'View full-bird',


    description: 'Display "full-bird" page.',

    inputs: {
        initialBirdNameFilter: {
          required: false,
          type: 'string',
          description: 'The initial filter on the bird name'
        }
      },

    exits: {

        success: {
            viewTemplatePath: 'pages/bird/full-bird',
        },

        redirect: {
            description: 'Bird does not exists',
            responseType: 'redirect'
        }

    },


    fn: async function(inputs) {
        //   if (this.req.me) {
        //     throw {redirect: '/'};
        //   }

        return { title: 'Birds Table', initialBirdNameFilter: inputs.initialBirdNameFilter  };

    }


};