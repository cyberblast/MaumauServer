var Maumau = (typeof Maumau === "undefined" || !Maumau ) ? {} : Maumau;
Maumau.Xhr = function(){
  /** getArgs: {path, args, onSuccess, onError} */
  this.get = function(getArgs){
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
Maumau.xhr = new Maumau.Xhr();
