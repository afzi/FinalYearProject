module.exports = {


    friendlyName: 'View live-view',
  
  
    description: 'Display "live-view" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/bird/live-view',
      },
  
      redirect: {
        description: 'Unknown Error',
        responseType: 'redirect'
      }
  
    },
  
  
    fn: async function () {
  
    //   if (this.req.me) {
    //     throw {redirect: '/'};
    //   }
  
      return {};
  
    }
  
  
  };
  