const colors = require('./card-color.js');
const values = require('./card-value.js');

function calcCompareValue(card){
  const comparevalues = {
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "Bube": 11,
    "Dame": 12,
    "König": 13,
    "Ass": 14
  };
  const comparecolors = {
    "Karo": 0,
    "Herz": 1,
    "Kreuz": 2,
    "Pik": 3
  }
  return comparevalues[card.value] + ( comparecolors[card.color] * 14 );
}

module.exports = class Card {
  #_color;
  #_value;
  name;
  compareValue;
  constructor(color, value) {
    // console.log("Creating Card " + color + " " + value);
    if( colors[color] === undefined ) throw "Not a card color";
    if( values[value] === undefined ) throw "Not a card value";
    this.#_color = color;
    this.#_value = value;
    this.name = color + " " + value;
    this.compareValue = calcCompareValue(this);
  }
  get color() {
    return this.#_color;
  }
  get value() {
    return this.#_value;
  }
}
