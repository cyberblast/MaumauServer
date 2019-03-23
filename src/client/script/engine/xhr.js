var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Client = (typeof Maumau.Client === "undefined" || !Maumau.Client ) ? {} : Maumau.Client;
Maumau.Client.Engine = (typeof Maumau.Client.Engine === "undefined" || !Maumau.Client.Engine ) ? {} : Maumau.Client.Engine;

Maumau.Client.Engine.Xhr = {
  
  /** getArgs: {path, args, onSuccess, onError} */
  get: function(getArgs){
    const responseError = xhr => {
      const headerError = xhr.getResponseHeader('Error');
      const message = headerError || xhr.responseText;
      if(message !== null && message !== '')
        return `${xhr.status} ${xhr.statusText}\n\r${message}`;
      else return `${xhr.status} ${xhr.statusText}`;
    };
    if(!getArgs.path) return // TODO: Error
    const xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.status === 200 && getArgs.onSuccess) getArgs.onSuccess(xhr.responseText);
        else if(getArgs.onError) getArgs.onError(responseError(xhr));
      }
    }
    xhr.open('GET', getArgs.path, true);
    xhr.send();
  }
}
