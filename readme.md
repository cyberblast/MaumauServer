# Maumau Server

State: Incomplete  
Priority: Low  
Perspective: Unclear

This is a project I mainly like to work at when I like to do something but actually don't know what. There is no deadline or any need to complete this.

Goal: Develop a fully playable [Maumau](https://en.wikipedia.org/wiki/Mau-Mau_(card_game)) card game

Way: I'd like to develop a mostly native node server. That means - I don't like to use existing modules/packages/extensions as far as possible and reasonable (if that word is applicable at all).  
I'd also like to use esnext JS as far as possible. 

Status: Far from reached.

## Contribution & Collaboration

First, before deciding to contribute to this repository read and accept LICENSE.txt & CONTRIBUTING.txt. 
Any contribution requires and assumes full consent.

Please see [this instructions](https://github.com/cyberblast/MaumauServer/wiki/Contribution-&-Collaboration) about how to commit code changes.

## Prerequisites

It is recommended to use a very current version of node.js (like v10.15.x).

## Dependencies

Some components are better off in a separate repository, developed separately with it's own focus and consumed via npm. This list may grow during development...

*Webserver*:  [repository](https://github.com/cyberblast/WebServer). [npm package](https://www.npmjs.com/package/@cyberblast/webserver)

## Commands & Settings

To start the game server call `npm run maumau`. Afterwards you can access it using a browser at: http://127.0.0.1/

You can change the server port (default: 80) in `webserver.json` (prior to starting the game server).

## Roadmap

**Homepage UI**
  * Some basic design
  * If there is a game running already show an alternative message like "game in progress. please wait"
  * If there is a game running and the current user is a player redirect to game page (stub)
  * If there is no game running allow users to opt in to the list of players
  * Start game button to start game and lock home
  * Some JS polling if the game has started

**Identification**
  * No Authentication
  * Allow to enter/change a name
  * Save IP/Name Pair ([local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))
  * Maybe "My Settings"

**Chat**
  * Simple chat
  * Should be sticky even upon navigate
  
**Game UI**
  * Cards
  * Table
  * Options
  * Poll for Updates  

**Game Logic**
  * Allowed cards
  * Play a card
  * Special Cards

**Admin Page**
  * Kill Game Session
  * Stop Server

**Multiple Game Sessions**
