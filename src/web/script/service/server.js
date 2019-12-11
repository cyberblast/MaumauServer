import Xhr from '../../engine/xhr.js';
export { Server as default }

const Server = {
  ip: function(resolve, error){
    Xhr.get({
      path: '/api/server/ip',
      onSuccess: ip => {
        resolve(`<span>${ip}</span>`);
      },
      onError: error
    });
  }
}
