const fs = require("fs");
const url = require('url');

module.exports = class Router {
  #fileRoot;
  #routes;

  constructor(configFile = './src/router.json'){
    const self = this;
    fs.readFile(configFile, function (err, data) {
      if (err) {
          console.log(err.stack);
          return;
      }
      // console.log(data.toString());
      const config = JSON.parse(data.toString());
      self.#routes = config.routes;
      self.#fileRoot = config.fileRoot || '';
    });
  }

  navigate(server, request, response){
    const pathname = url.parse(request.url).pathname;
    const client = request.socket.remoteAddress.split(':').pop();    
    console.log('Request for "' + pathname + '" received from ' + client);

    const byPath = route => route.path === pathname;
    let route = this.#routes.find(byPath);

    if(route === undefined){
      const byDefault = route => route.path === '*';
      const defaultRoute = this.#routes.find(byDefault);
      if( defaultRoute === undefined ){
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end();
        return;
      }
      // TODO: better/faster cloning
      route = JSON.parse(JSON.stringify(defaultRoute));
      route.content = route.content ? route.content + pathname.substr(1) : pathname.substr(1);
    }

    if(route.handler === 'file'){
      const path = this.#fileRoot + route.content;
      this.navigateFile(server, request, response, path);
    } else if(route.handler === 'module'){
      this.navigateModule(server, request, response, route.module, route.function);
    }
  }

  navigateFile(server, request, response, path){
    if(path == null){
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end();
      return;
    }
    fs.readFile(path, function (err, data) {
      if (err) {
        console.log(err);
        response.writeHead(404, {'Content-Type': 'text/html'});
      } else {
        // TODO: Set Content Type {'Content-Type': 'text/html'}
        // or Binary (favicon) or whatever...
        if( path.endsWith('.html') )
          response.writeHead(200, {'Content-Type': 'text/html'});	
        else response.writeHead(200);	
        response.write(data);		
      }
      response.end();
    });
  }

  navigateModule(server, request, response, module, func){
    const module = require(module);
    module[func](server, request, response);
  }
}
