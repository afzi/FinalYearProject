module.exports = {


    friendlyName: 'View create-bird',
  
  
    description: 'Display "create-bird" page.',
  
  
    exits: {
  
      success: {
        viewTemplatePath: 'pages/bird/get-bird',
      },
  
      redirect: {
        description: 'Bird does not exists',
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
  