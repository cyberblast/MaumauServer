const http = require('http');
const config = require('@cyberblast/config');

if (process.argv.length < 3) {
  console.log("missing args");
  process.exit(-1);
}
const path = process.argv[2];

let content = '';
const onError = function(e) {
  console.error(e);
};
const onEnd = function() {
  console.log(content);
};
const onData = function(chunk) {
  content += chunk;
};

const settingsRdy = settings => {
  const url = `http://127.0.0.1:${settings.server.port}/api`;

  if( process.argv.length == 3){  
    http.get(`${url}/${path}`, function(res) {
      if(res.headers['error'] !== undefined) {
        console.error(res.headers['error']);
        return;
      }
      res.on('data', onData);
      res.on('end', onEnd);
    }).on('error', onError);
  } else {
    const req = http.request(`${url}/${path}`, {
      method: 'POST'
    },     
    function(res) {
      if(res.headers['error'] !== undefined) {
        console.error(res.headers['error']);
        return;
      }
      res.on('data', onData);
      res.on('end', onEnd);
    });
    req.on('error', onError);
    req.write(process.argv[3]);
    req.end();
  }
}

global.config = config.load(
  console.error,
  settingsRdy,
  './src/webserver.json');
