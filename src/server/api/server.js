let appVersion = undefined;

module.exports = class Server{
  static version(serverContext){
    if(appVersion === undefined){
      let appPack = require('../../../package.json');
      appVersion = appPack.version;
    }
    serverContext.logger.log({
      category: 'server',
      severity: 'Verbose',
      message: `Server API version called`,
      data: appVersion
    });
    return appVersion;
  }
  static ip(serverContext){
    const ip = serverContext.request.socket.remoteAddress.split(':').pop();
    serverContext.logger.log({
      category: 'server',
      severity: 'Verbose',
      message: `Server API ip requested`,
      data: ip
    });
    return ip;
  }
  static stop(serverContext){
    serverContext.logger.log({
      category: 'server',
      severity: 'Verbose',
      message: `Server API stop requested`
    });
    serverContext.response.write("Stopping server!");
    serverContext.response.end();
    serverContext.server.stop();
  }
}
