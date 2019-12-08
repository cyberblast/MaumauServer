const gameLogic = require('../logic/game/game');

let currentGame = null;

module.exports = class Game{
  static state(){
    if(currentGame === null) return 'no game running';
    return `Game running for ${currentGame.playerCount} players. Current turn: player ${currentGame.currentPlayer + 1}`
  }
  static start(){
    if(currentGame !== null) return 'Can\'t start a second game!';
    currentGame = new gameLogic(2);
    return 'New game started';
  }
  static stop(){
    if(currentGame === null) return 'No game running!';
    currentGame = null;
    return 'Game stopped';
  }
  static showHand(){
    if(currentGame === null) return 'No game running!';
    return JSON.stringify(currentGame.cards.showHand(currentGame.currentPlayer));
  }
}
