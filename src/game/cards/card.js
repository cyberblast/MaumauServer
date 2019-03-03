const colors = require('./card-color.js');
const values = require('./card-value.js');

module.exports = class Card {
  #_color;
  #_value;
  name;
  constructor(color, value) {
    // console.log("Creating Card " + color + " " + value);
    if( colors[color] === undefined ) throw "Not a card color";
    if( values[value] === undefined ) throw "Not a card value";
    this.#_color = color;
    this.#_value = value;
    this.name = color + " " + value;
  }
  get color() {
    return this.#_color;
  }
  get value() {
    return this.#_value;
  }
}
