var http = require('http');
var fs = require('fs');
var url = require('url');
var Router = require('./router.js');

module.exports = class GameServer{
  #server;
  #game;
  #router;
  constructor(){
    const self = this;
    this.#router = new Router();
    this.#server = http.createServer(function(request, response){
      self.process(request, response);
    });
  }

  start(port){
    this.#server.listen(port);
    console.log('Server running at http://127.0.0.1:' + port + '/');
  }
  stop(){
    this.#server.removeAllListeners()
    console.log('Server stopped!');
    process.abort();
  }

  process(request, response){
    const pathname = url.parse(request.url).pathname;
    const client = request.socket.remoteAddress.split(':').pop();
    console.log('Request for "' + pathname + '" received from ' + client);
    this.#router.navigate(this, request, response);
  }
}
