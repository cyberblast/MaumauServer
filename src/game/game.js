const CardControl = require('./cards/card-control.js');

module.exports = class Game {
  #cards;
  #currentPlayer;
  #playerCount;

  constructor(playerCount){
    console.log('Creating a new game for ' + playerCount + ' players');

    this.#playerCount = playerCount;
    this.#cards = new CardControl(playerCount);
    this.#cards.giveHands(global.config.rules.initialHandSize);
    this.#currentPlayer = Math.floor(Math.random() * this.#playerCount);
  }
  next(){
    this.#currentPlayer = ((this.#currentPlayer + 1) % this.#playerCount);
    console.log("Your turn, Player " + (this.#currentPlayer+1));
    console.log(this.#cards.showHand(this.#currentPlayer));
  }
}
