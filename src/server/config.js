const fs = require("fs");
const events = require('events');

module.exports = class Config{
  event = new events.EventEmitter();
  #complete = false;
  constructor(filePath = 'game.json'){
    this.loadFile(filePath, config => {
      this.game = config;
      this.complete = true;
      this.event.emit('loaded');
    });
  }
  ready(callback){
    this.event.on('loaded', callback);
    if(this.complete === true){ 
      // has been loaded already
      callback();
    }
  }
  loadFile(filePath, complete){
    fs.readFile(filePath, function (err, data) {
      if (err) {
          console.log(err.stack);
          return;
      }
      complete(JSON.parse(data.toString()));
    });
  }
}
