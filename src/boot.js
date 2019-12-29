const { WebServer } = require('@cyberblast/webserver');

const server = new WebServer('./src/webserver.json', './src/log.json');
server.start();
