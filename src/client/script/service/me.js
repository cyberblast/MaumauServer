var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Service = (typeof Maumau.Client.Service === "undefined" || !Maumau.Client.Service ) ? {} : Maumau.Client.Service;

Maumau.Client.Service.Me = {
  getName: function(callback){
    // TODO: save custom name in local storage
    // if none - get IP
    Maumau.Client.Engine.Xhr.get({
      path: '/api/ip',
      onSuccess: ip => {
        callback(`<span>${ip}</span>`);
      }
    });
  }
}
