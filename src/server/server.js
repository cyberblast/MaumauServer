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
    // this.#router = {
    //   "/": self.root,
    //   "/stop": (server, request, response) => self.stop(server, request, response),
    //   "/me": self.me
    // };
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
    // Parse the request containing file name
    const pathname = url.parse(request.url).pathname;
    const client = request.socket.remoteAddress.split(':').pop();
    console.log('Request for "' + pathname + '" received from ' + client);
    this.#router.navigate(this, request, response);
    
    // response.writeHead(200, {'Content-Type': 'text/html'});
    // const route = this.#router[pathname];
    // if(route!==undefined) {
    //   const chunk = route(this, request, response);
    //   if(chunk != null)response.write(chunk);
    // }
    // else response.write("Unknown command!");
    // response.end();

  }
}

// loadFile(url, response){
//   // Read the requested file content from file system
//   fs.readFile(pathname.substr(1), function (err, data) {
//      if (err) {
//         console.log(err);
        
//         // HTTP Status: 404 : NOT FOUND
//         // Content Type: text/plain
//         response.writeHead(404, {'Content-Type': 'text/html'});
//      } else {	
//         //Page found	  
//         // HTTP Status: 200 : OK
//         // Content Type: text/plain
//         response.writeHead(200, {'Content-Type': 'text/html'});	
        
//         // Write the content of the file to response body
//         response.write(data.toString());		
//      }
     
//      // Send the response body 
//      response.end();
//   });
// }