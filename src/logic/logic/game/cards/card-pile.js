const colors = require('./card-color.js.js');
const values = require('./card-value.js.js');
const card = require('./card.js.js');

module.exports = class CardPile {
  #cards;
  constructor(initialPile = []){
    this.#cards = initialPile;
  }
  get count(){
    return this.#cards.length;
  }
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
  take(card){
    if( this.count === 0 ) return null;
    const index = this.#cards.findIndex(c => c.value === card.value && c.color === card.color);
    if( index < 0 ) return null;
    return this.#cards.splice(index, 1)[0];
  }
  takeIndex(index){
    if( index < 0 || index >= this.count) return null;
    return this.#cards.splice(index, 1)[0];
  }
  view(index){
    if( index < 0 || index >= this.count) return null;
    return this.#cards[index];
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
      for (const value in values) {
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
  sort(){
    this.#cards.sort(this.compare)
  }
  compare(a, b){
    return a.compareValue - b.compareValue;
  }
  showCards(){
    return this.#cards.slice()
  }
  includes(card){
    return undefined !== this.#cards.find(c => c.value === card.value && c.color === card.color);
  }
}
  