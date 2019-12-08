const gameLogic = require('../logic/game/game');
const config = require('@cyberblast/config');

let currentGame = null;

module.exports = class Game{
  static state(){
    if(currentGame === null || currentGame.state === 'closed') return 'no game running';
    return `Game running for ${currentGame.playerCount} players. Current turn: player ${currentGame.currentPlayer + 1}`
  }
  static start(){
    if(currentGame !== null && currentGame.state !== 'closed') return 'Can\'t start a second game!';
    
    const loaded = gameCfg => {
      currentGame = new gameLogic(gameCfg, 2);
    }
    config.load(
      console.error,
      loaded,
      './src/game.json');
    return 'Starting a new game...';
  }
  static stop(){
    if(currentGame === null || currentGame.state === 'closed') return 'No game running!';
    currentGame = null;
    return 'Game stopped';
  }
  static showHand(){
    if(currentGame === null || currentGame.state === 'closed') return 'No game running!';
    return JSON.stringify(currentGame.showHand());
  }
  static drawCard(){
    if(currentGame === null || currentGame.state === 'closed') return 'No game running!';
    currentGame.drawCard();
    return `drawing a card...`;
  }
  static putCard(serverContext){
    if(currentGame === null || currentGame.state === 'closed') return 'No game running!';
    currentGame.playCard(serverContext.data);
    return `playing card ${serverContext.data}`;
  }
  static endTurn(){
    if(currentGame === null || currentGame.state === 'closed') return 'No game running!';
    currentGame.endTurn();
    return `ending turn`;
  }
}
