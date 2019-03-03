const colors = require('./card-color.js');
const values = require('./card-value.js');
const card = require('./card.js');

module.exports = class CardPile {
  #cards;
  constructor(initialPile = []){
    this.#cards = initialPile;
  }
  get count(){
    return this.#cards.length;
  }
  // get internalArray(){
  //   return this.#cards;
  // }
  addTopCard(card){
    this.#cards.push(card);
  }
  addTopPile(cards){
    this.#cards.push(...cards);
  }
  addBottomCard(card){
    this.#cards.unshift(card);
  }
  addBottomPile(cards){
    this.#cards.unshift(...cards);
  }
  takeTop(){
    if( this.count === 0 ) return null;
    return this.#cards.pop(card);
  }
  takeRandom(){
    if( this.count === 0 ) return null;
    let index = Math.floor(Math.random()*this.count);
    return this.#cards.splice(index, 1)[0];
  }
  takeAll(){
    return this.#cards.splice(0, this.count);
  }
  static newCardPackage(){
    let newCards = [];
    for (const color in colors) {
      // console.log("Processing color:" + color);
      for (const value in values) {
        // console.log("Processing value:" + value);
        // const c = new card(color, value);
        newCards.push(new card(color, value));
      }
    }
    return newCards;
  }
  mix(){
    const newpile = [];
    let next;
    while(next = this.takeRandom()){
      newpile.push(next);
    }
    this.#cards = newpile;
  }
  showCards(){
    return this.#cards.slice();
  }
}
  