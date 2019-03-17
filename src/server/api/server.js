let appVersion = undefined;

module.exports = class Server{
  static version(server, request, response){
    if(appVersion === undefined){
      console.log('loading version from package.json');
      let appPack = require('../../../package.json');
      appVersion = appPack.version;
    }
    return appVersion;
  }
  static ip(server, request, response){
    return request.socket.remoteAddress.split(':').pop();
  }
  static stop(server, request, response){
    response.write("Stopping server!");
    response.end();
    server.stop();
  }
}