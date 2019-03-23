const config = require('@cyberblast/config')
const server = require('@cyberblast/webserver');

const settingsRdy = settings => {
  server.onError(console.error);
  server.start('./src/webserver.json');
}
global.config = config.load(
  console.error,
  settingsRdy,
  './src/game.json');
