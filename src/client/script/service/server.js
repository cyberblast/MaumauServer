var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Service = (typeof Maumau.Client.Service === "undefined" || !Maumau.Client.Service ) ? {} : Maumau.Client.Service;

Maumau.Client.Service.Server = {
  ip: function(callback){
    // TODO: save custom name in local storage
    // if none - get IP
    Maumau.Client.Engine.Xhr.get({
      path: '/api/server/ip',
      onSuccess: ip => {
        callback(`<span>${ip}</span>`);
      }
    });
  }
}
