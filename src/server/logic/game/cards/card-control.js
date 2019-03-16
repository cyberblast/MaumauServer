const CardPile = require('./card-pile');

module.exports = class CardControl {  
  #drawPile;
  #discardPile;
  #playerPiles;
  #playerCount;
  #openCard;

  constructor(playerCount){
    // store player Count
    this.#playerCount = playerCount;

    // Create a new draw pile
    this.#drawPile = new CardPile(CardPile.newCardPackage());
    this.#drawPile.mix();

    // Create a new discard pile
    this.#discardPile = new CardPile();

    // Create new player piles
    this.#playerPiles = [];
    for(let p = 0; p < playerCount; p++){
      this.#playerPiles[p] = new CardPile();
    }
  }

  giveHands(amount){
    for(let i = 0; i < amount; i++){
      for(let iPlayer = 0; iPlayer < this.#playerCount; iPlayer++){
        const card = this.#drawPile.takeTop();
        this.#playerPiles[iPlayer].addTopCard(card);
      }
    }
  }

  showHand(player){
    return this.#playerPiles[player].showCards();
  }
}
  