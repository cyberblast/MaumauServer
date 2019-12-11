const colors = require('./card-color.js.js');
const values = require('./card-value.js.js');

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
  return (comparevalues[card.value] * 4) + comparecolors[card.color];
}

module.exports = class Card {
  #_color;
  #_value;
  name;
  #compareValue;

  constructor(color, value) {
		// for(const property of ['color', 'value']) {
		// 	const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, property);
		// 	const modified_descriptor = Object.assign(descriptor, {enumerable: true});
		// 	Object.defineProperty(this, property, modified_descriptor);
    // }
  
    // const prototype = Object.getPrototypeOf(this);
    // const prototype_property_descriptors = Object.getOwnPropertyDescriptors(prototype);
    // for(const [property, descriptor] of Object.entries(prototype_property_descriptors)) {
    //   const is_nonstatic_getter = (typeof descriptor.get === "function");
    //   if(is_nonstatic_getter) {
    //     descriptor.enumerable = true;
    //     Object.defineProperty(this, property, descriptor);
    //   }
    // }
  
    if( colors[color] === undefined ) throw "Not a card color";
    if( values[value] === undefined ) throw "Not a card value";
    this.#_color = color;
    this.#_value = value;
    this.name = color + " " + value;
    this.#compareValue = calcCompareValue(this);
  }
  get color() {
    return this.#_color;
  }
  get value() {
    return this.#_value;
  }
  get compareValue() {
    return this.#compareValue;
  }
  
  toJSON() {
    return {
      color: this.#_color,
      value: this.#_value
    }
  }
}
