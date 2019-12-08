const CardControl = require('./cards/card-control.js');

module.exports = class Game {
  #cards;
  #currentPlayer;
  #playerCount;

  get playerCount() {
    return this.#playerCount;
  }
  get currentPlayer() {
    return this.#currentPlayer;
  }
  get cards() {
    return this.#cards;
  }

  constructor(playerCount){
    console.log(`Creating a new game for ${playerCount} players`);
    this.#playerCount = playerCount;
    this.#cards = new CardControl(playerCount);
    this.#cards.giveHands(global.config.rules.initialHandSize);
    this.#currentPlayer = Math.floor(Math.random() * this.#playerCount);
    this.next();
  }
  
  next(){
    this.#currentPlayer = ((this.#currentPlayer + 1) % this.#playerCount);
    console.log(`Your turn, Player ${this.#currentPlayer+1}`);
    console.log(this.#cards.showHand(this.#currentPlayer));
  }
}
