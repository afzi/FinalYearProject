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
      sails.log("testing 123");
  
    //   if (this.req.me) {
    //     throw {redirect: '/'};
    //   }
  
      return {};
  
    }
  
  
  };
  