# cyberblast Maumau Server <img src="https://raw.githubusercontent.com/cyberblast/MaumauServer/dev/src/web/favicon.ico" align="right" />

_A Node native "Maumau" card game server_

This is a project I mainly like to work at when I like to do something .. else. There is no deadline or any need to complete this.

Primary goal: Develop a fully playable multiplayer [Maumau](https://en.wikipedia.org/wiki/Mau-Mau_(card_game)) card game.

Secondary goal: I'd like to develop a mostly native node server. That means - I don't like to use existing modules/packages/extensions as far as possible.

Secondary goal: The whole thing is rather an exercise. Trying to learn things and get to new topics. Basic research as well as experimenting.

Secondary goal: Create separate repositories for reusable components (those listed as 'dependencies' below).

## Contribution & Collaboration

First, before deciding to contribute to this repository please read and accept LICENSE & CONTRIBUTING files.  
Any contribution requires and assumes full consent.

Please see [this instructions](https://github.com/cyberblast/MaumauServer/wiki/Contribution-&-Collaboration) about how to commit code changes.

## Commands & Settings

To start the game server call `npm run server`. Afterwards you can access it using a browser at: http://127.0.0.1/

To manually request an api endpoint from console, use `node call <pathToApiEndpoint>`. E.g. `node call game/state` or `node call game/start`.  
Using VS Code, you will have to open a second terminal to do that. 

## Configuration

You can change the server port (default: 80) in `./src/webserver.json` (prior to starting the game server).  
More details about general web server settings may be available at the webserver repository (see dependencies below).

Game rules can be defined in file `./src/game.json`.

Logging can be adjusted in file `./src/log.json`.
Details regarding logger configuration can be found at its repository (see dependencies below).

## Dependencies

* [cyberblast config](https://github.com/cyberblast/config)  
  A simple json config file loader for node.js
* [cyberblast logger](https://github.com/cyberblast/logger)  
  A simple logger for node.js
* [cyberblast webserver](https://github.com/cyberblast/WebServer)  
  A minimal node-based web server

## Legal

Please take note of files [LICENSE](https://raw.githubusercontent.com/cyberblast/MaumauServer/master/LICENSE) and [CONTRIBUTING](https://raw.githubusercontent.com/cyberblast/MaumauServer/master/CONTRIBUTING).
