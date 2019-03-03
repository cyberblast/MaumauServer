const Card = require('./cards/card.js');
const CardColor = require('./cards/card-color.js');
const CardControl = require('./cards/card-control.js');
const CardPile = require('./cards/card-pile.js');

const INITIAL_HAND_SIZE = 7

module.exports = class Game {
  #cards;
  #currentPlayer;
  #playerCount;

  constructor(playerCount){
    console.log('Creating a new game for ' + playerCount + ' players');

    this.#playerCount = playerCount;
    this.#cards = new CardControl(playerCount);
    this.#cards.giveHands(INITIAL_HAND_SIZE);
    this.#currentPlayer = Math.floor(Math.random() * this.#playerCount);
  }
  next(){
    this.#currentPlayer = ((this.#currentPlayer + 1) % this.#playerCount);
    console.log("Your turn, Player " + (this.#currentPlayer+1));
    console.log(this.#cards.showHand(this.#currentPlayer));
  }
}
