var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Engine = (typeof Maumau.Client.Engine === "undefined" || !Maumau.Client.Engine ) ? {} : Maumau.Client.Engine;

Maumau.Client.Engine.Xhr = {
  /** getArgs: {path, args, onSuccess, onError} */
  get: function(getArgs){
    if(!getArgs.path) return // TODO: Error
    const xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.status === 200 && getArgs.onSuccess) getArgs.onSuccess(xhr.responseText);
        else if(getArgs.onError) getArgs.onError(xhr.responseText);
      }
    }
    xhr.open('GET', getArgs.path, true);
    xhr.send();
  }
}
