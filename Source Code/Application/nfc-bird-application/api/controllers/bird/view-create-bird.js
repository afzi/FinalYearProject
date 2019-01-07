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
  
  
    fn: async function () {
  
<<<<<<< HEAD
      // if (this.req.me) {
      //   throw {redirect: '/'};
      // }
=======
    //   if (this.req.me) {
    //     throw {redirect: '/'};
    //   }
>>>>>>> dde2e2ea0320ee5d925748fc2d850129a9c56e8d
  
      return {};
  
    }
  
  
  };
  