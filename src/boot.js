const Config = require('./server/config.js')
const server = require('@cyberblast/webserver');

global.config = new Config('./src/game.json');
server.onError(err => console.error(err));
global.config.ready(()=> {
  server.start('./src/webserver.json');
});
