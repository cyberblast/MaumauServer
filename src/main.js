const Config = require('./config.js')
const GameServer = require('./server/server.js');

// add to global namespace to reuse within deeper modules
global.config = new Config();

const server = new GameServer();
server.start(global.config.server.port);
