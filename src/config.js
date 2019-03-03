const fs = require("fs");
const events = require('events');

module.exports = class Config{
  server;
  rules;
  events = new events.EventEmitter();
  constructor(configFile = 'src/game.json'){
    const self = this;
    fs.readFile(configFile, function (err, data) {
      if (err) {
          console.log(err.stack);
          return;
      }
      const config = JSON.parse(data.toString());
      self.server = config.server;
      self.rules = config.rules;
      self.events.emit('loaded');
    });
  }
}