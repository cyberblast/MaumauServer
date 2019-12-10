const CardControl = require('./cards/card-control.js');

module.exports = class Game {
  #cards;
  #currentPlayer;
  #playerCount;
  #gameConfig;
  #currentPlayerHasDrawn;
  #currentPlayerHasPut;
  #state;
  logger;

  get playerCount() {
    return this.#playerCount;
  }
  get currentPlayer() {
    return this.#currentPlayer;
  }
  get nextPlayer() {
    return (this.#currentPlayer + 1) % this.#playerCount;
  }
  get playerName(){
    return `Player ${this.#currentPlayer+1}`;
  }
  get nextPlayerName(){
    return `Player ${this.nextPlayer+1}`;
  }
  get state() {
    return this.#state;
  }

  constructor(config, playerCount, logger){
    this.logger = logger;
    logger.log({
      category: 'game',
      severity: 'Info',
      message: `Creating a new game for ${playerCount} players.`
    });
    this.#state = 'running';
    this.#playerCount = playerCount;
    this.#gameConfig = config;
    this.#cards = new CardControl(playerCount);
    this.#cards.giveHands(config.rules.initialHandSize);
    this.#currentPlayer = Math.floor(Math.random() * this.#playerCount);
    this.opening();
  }

  opening(){
    const card = this.#cards.drawCard();
    logger.log({
      category: 'game',
      severity: 'Verbose',
      message: `Dealer opens game with ${card.name}.`
    });
    this.#putCard(card);
  }

  endTurn(){
    if(this.#currentPlayerHasDrawn === false && this.#currentPlayerHasPut === false){
      logger.log({
        category: 'game',
        severity: 'Verbose',
        message: `You must draw or play a card first, ${this.playerName}!`
      });
      return;
    }
    this.#currentPlayer = this.nextPlayer;
    this.#currentPlayerHasDrawn = false;
    this.#currentPlayerHasPut = false;
    logger.log({
      category: 'game',
      severity: 'Verbose',
      message: `Your turn, ${this.playerName}`
    });
    this.showHand();
  }

  showHand(){
    logger.log({
      category: 'game',
      severity: 'Verbose',
      message: this.#cards.showHand(this.#currentPlayer)
    });
    logger.log({
      category: 'game',
      severity: 'Verbose',
      message: `It's ${this.#cards.openCard.name} open`
    });
  }

  drawCard(){
    if(this.#currentPlayerHasDrawn === true){
      logger.log({
        category: 'game',
        severity: 'Verbose',
        message: `${this.playerName} has already drawn a card!`
      });
      return;
    }
    const card = this.#cards.drawCard();
    this.#cards.addPlayerCard(this.#currentPlayer, card);
    this.#currentPlayerHasDrawn = true;
    logger.log({
      category: 'game',
      severity: 'Verbose',
      message: `${this.playerName} draws ${card.name}!`
    });
    this.showHand();
  }

  playCard(card){
    if(!this.#cards.hasPlayerCard(this.#currentPlayer, card)){
      logger.log({
        category: 'game',
        severity: 'Verbose',
        message: `${this.playerName} doesn't own that card!`
      });
      return;
    }
    if(!this.isCardAllowedToPut(card)){
      logger.log({
        category: 'game',
        severity: 'Verbose',
        message: `${card.name || card} can't be played right now!`
      });
      return;
    }

    const playerCard = this.#cards.takePlayerCard(this.#currentPlayer, card);
    logger.log({
      category: 'game',
      severity: 'Verbose',
      message: `${this.playerName} plays ${playerCard.name}.`
    });
    this.#putCard(playerCard);
  }

  isCardAllowedToPut(card){
    let desiredCard = card;
    if(!isNaN(card)){
      desiredCard = this.#cards.viewPlayerCard(this.#currentPlayer, card);
    }
    return desiredCard.value === "Bube" || this.#cards.openCard.color === desiredCard.color || this.#cards.openCard.value === desiredCard.value;
  }

  #putCard = function(card){
    this.#cards.putOpenCard(card);
    this.#currentPlayerHasPut = true;
    this.checkWin();
    this.handleCardEffect(card);
    this.endTurn();
  }

  checkWin(){
    if(0 === this.#cards.countHand(this.#currentPlayer)){
      logger.log({
        category: 'game',
        severity: 'Info',
        message: `${this.playerName} wins!`
      });
      this.state = "closed";
    }
  }

  handleCardEffect(card){
    const cardEffects = {
      "7": () => {
        logger.log({
          category: 'game',
          severity: 'Verbose',
          message: `${this.nextPlayerName} draws 2 cards`
        });
        const card = this.#cards.drawCard();
        this.#cards.addPlayerCard(this.nextPlayer, card);
        const card2 = this.#cards.drawCard();
        this.#cards.addPlayerCard(this.nextPlayer, card2);
      },
      "8": () => {
        logger.log({
          category: 'game',
          severity: 'Verbose',
          message: `${this.nextPlayerName} has to skip a turn`
        });
        this.#currentPlayer = this.nextPlayer;
        this.#currentPlayerHasDrawn = true;
        this.#currentPlayerHasPut = true;
      },
      "Bube": () => {
        logger.log({
          category: 'game',
          severity: 'Verbose',
          message: `${this.playerName} can make a wish, but's that not implemented yet, sorry bro...`
        });
        // todo: implement Bube
      }
    }
    const effect = cardEffects[card.value];
    if(effect === undefined) return;
    effect.bind(this)();
  }  
}
