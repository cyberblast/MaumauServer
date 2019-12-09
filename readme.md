# cyberblast Maumau Server

Node native "Maumau" card game server

[![GitHub version](https://badge.fury.io/gh/cyberblast%2FMaumauServer.svg)](https://badge.fury.io/gh/cyberblast%2FMaumauServer)

This is a project I mainly like to work at when I like to do something but actually don't know what. There is no deadline or any need to complete this.

Goal: Develop a fully playable multiplayer [Maumau](https://en.wikipedia.org/wiki/Mau-Mau_(card_game)) card game.

Way: I'd like to develop a mostly native node server. That means - I don't like to use existing modules/packages/extensions as far as possible.

## Contribution & Collaboration

First, before deciding to contribute to this repository please read and accept LICENSE & CONTRIBUTING files.  
Any contribution requires and assumes full consent.

Please see [this instructions](https://github.com/cyberblast/MaumauServer/wiki/Contribution-&-Collaboration) about how to commit code changes.

## Commands & Settings

To start the game server call `npm run server`. Afterwards you can access it using a browser at: http://127.0.0.1/

To request an api endpoint, use `node call <pathToApiEndpoint>`. E.g. `node call game/state` or `node call game/start`.  
Using VS Code, you will have to open a second terminal to do that. 

## Configuration

*Incomplete*

You can change the server port (default: 80) in `webserver.json` (prior to starting the game server).
