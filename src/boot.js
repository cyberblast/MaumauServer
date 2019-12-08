const server = require('@cyberblast/webserver');
server.onError(console.error);
server.start('./src/webserver.json');
