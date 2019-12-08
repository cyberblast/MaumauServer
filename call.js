const http = require('http');
const config = require('@cyberblast/config');

if (process.argv.length <= 2) {
  console.log("missing args");
  process.exit(-1);
}
const path = process.argv[2]

const settingsRdy = settings => {
  const url = `http://127.0.0.1:${settings.server.port}/api`;
  
  http.get(`${url}/${path}`, function(res) {
    if(res.headers['error'] !== undefined) {
      console.error(res.headers['error']);
      return;
    }
    let content = '';
    res.on('data', function(chunk) {
      content += chunk;
    });
    res.on('end', function() {
      console.log(content);
    });
  }).on('error', function(e) {
    console.error(e);
  });
}

global.config = config.load(
  console.error,
  settingsRdy,
  './src/webserver.json');
