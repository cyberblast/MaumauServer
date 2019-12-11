export { Xhr as default }


function responseError(xhr) {
  const headerError = xhr.getResponseHeader('Error');
  const message = headerError || xhr.responseText;
  if(message !== null && message !== '')
    return `${xhr.status} ${xhr.statusText}\n\r${message}`;
  else return `${xhr.status} ${xhr.statusText}`;
};

const Xhr = {
  /**
   * @callback messageCallback
   * @param {string} message - ...
   */

  /**
  * @typedef XhrArgs
  * @type {object}
  * @property {string} path
  * @property {?object} options
  * @property {messageCallback} onSuccess
  * @property {messageCallback} onError
  */

  /** 
   * @param {XhrArgs} args
   */
  get: function(args){
    if(args === undefined || args.path === undefined) {
      console.log('Error: Xhr.get requires a path argument!');
      return;
    }
    const xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.status === 200 && args.onSuccess) args.onSuccess(xhr.responseText);
        else if(args.onError) args.onError(responseError(xhr));
      }
    }
    xhr.open(args.body ? 'POST' : 'GET', args.path, true);
    xhr.send(args.body);
  }
}
