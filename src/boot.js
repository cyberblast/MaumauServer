const Config = require('./config/config.js')
const GameServer = require('./server/server.js');

// add to global namespace to reuse within deeper modules
global.config = new Config();
global.config.ready(()=> {
  const server = new GameServer();
  server.start(global.config.game.server.port);
});
