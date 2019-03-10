var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Me = function(){
  this.getName = function(ajax, callback){
    // TODO: save custom name in local storage
    // if none - take local IP
    ajax.get({
      path: '/api/ip',
      onSuccess: callback
    });
  }
}
// static function
Maumau.Me.getName = function(callback){
  const me = new Maumau.Me();
  me.getName(new Maumau.Ajax(), name => {
    callback(`<span>${name}</span>`);
  });
}