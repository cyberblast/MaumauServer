var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Me = function(){
  this.getName = function(callback){
    // TODO: save custom name in local storage
    // if none - take local IP
    Maumau.xhr.get({
      path: '/api/ip',
      onSuccess: callback
    });
  }
}
Maumau.me = new Maumau.Me();

// static function for dynamic clientScript handler
Maumau.Me.getName = function(callback){
  Maumau.me.getName(name => {
    callback(`<span>${name}</span>`);
  });
}