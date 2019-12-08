const config = require('@cyberblast/config');

const settingsRdy = settings => {
  global.config = settings;
  const server = require('@cyberblast/webserver');
  server.onError(console.error);
  server.start('./src/webserver.json');
}
config.load(
  console.error,
  settingsRdy,
  './src/game.json');
