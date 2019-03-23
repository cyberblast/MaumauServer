let appVersion = undefined;

module.exports = class Server{
  static version(serverContext){
    if(appVersion === undefined){
      console.log('loading version from package.json');
      let appPack = require('../../../package.json');
      appVersion = appPack.version;
    }
    return appVersion;
  }
  static ip(serverContext){
    return serverContext.request.socket.remoteAddress.split(':').pop();
  }
  static stop(serverContext){
    serverContext.response.write("Stopping server!");
    serverContext.response.end();
    serverContext.server.stop();
  }
}