const fs = require("fs");

module.exports = class Config{
  server;
  rules;
  constructor(configFile = './src/game.json'){
    const self = this;
    fs.readFile(configFile, function (err, data) {
      if (err) {
          console.log(err.stack);
          return;
      }
      const config = JSON.parse(data.toString());
      self.server = config.server;
      self.rules = config.rules;
    });
  }
}