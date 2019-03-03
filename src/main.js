const GameServer = require('./server/server.js');

const PORT = 80;

const server = new GameServer();
server.start(PORT);
