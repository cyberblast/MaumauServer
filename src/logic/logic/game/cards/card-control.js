const CardPile = require('./card-pile');

module.exports = class CardControl {  
  #drawPile;
  #discardPile;
  #playerPiles;
  #playerCount;
  #openCard;

  get openCard() {
    return this.#openCard;
  }

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

  drawCard(){
    if(this.#drawPile.count === 0){
      // todo: throw error, when discardPile.count === 0
      this.mergePiles();
    }
    return this.#drawPile.takeTop();
  }

  mergePiles(){
    this.#drawPile.addTopPile(this.#discardPile.takeAll());
    this.#drawPile.mix();
  }

  giveHands(amount){
    for(let i = 0; i < amount; i++){
      for(let iPlayer = 0; iPlayer < this.#playerCount; iPlayer++){
        const card = this.drawCard();
        this.addPlayerCard(iPlayer, card, false);
      }
    }
    for(let iPlayer = 0; iPlayer < this.#playerCount; iPlayer++){
      this.#playerPiles[iPlayer].sort();
    }
  }

  addPlayerCard(player, card, sort=true){
    this.#playerPiles[player].addTopCard(card);
    if(sort === true) this.#playerPiles[player].sort();
  }

  hasPlayerCard(player, card){
    if(isNaN(card)){
      return this.#playerPiles[player].includes(card);
    } else {
      return card >= 0 && this.#playerPiles[player].count > card;
    }
  }

  takePlayerCard(player, card){
    if(isNaN(card)){
      return this.#playerPiles[player].take(card);
    }
    else {
      return this.#playerPiles[player].takeIndex(card);
    }
  }
  viewPlayerCard(player, index){
    return this.#playerPiles[player].view(index);
  }

  putOpenCard(card){
    if(this.#openCard !== null){
      this.#discardPile.addTopCard(this.#openCard);
    }
    this.#openCard = card;
  }

  showHand(player){
    return this.#playerPiles[player].showCards();
  }
  countHand(player){
    return this.#playerPiles[player].count;
  }
}
  