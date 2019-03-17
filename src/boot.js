const Config = require('./server/config.js')
const server = require('@cyberblast/webserver');

// add to global namespace to reuse within deeper modules
global.config = new Config();
global.config.ready(()=> {
  server.start();
});
