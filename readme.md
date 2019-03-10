# Maumau Server

State: Incomplete  
Priority: Low  
Perspective: Unclear

This is a project I mainly like to work at when I like to do something but actually don't know what. There is no deadline or any need to complete this.

Goal: Develop a fully playable [Maumau](https://en.wikipedia.org/wiki/Mau-Mau_(card_game)) card game

Way: I'd like to develop a mostly native node server. That means - I don't like to use existing modules/packages/extensions as far as possible and reasonable (if that word is applicable at all). 
I'd also like to use esnext JS as far as possible. 

Detailed Status: 
* Web Server: *Initial* implementation complete, including a custom router allowing to redirect to files (UI) or module functions (API). More to come.
* Game: Implemented some general card classes & controllers, but not much yet!
* UI: 0%
* API: 0%

## Collaboration

First, before deciding to contribute to this repository read and accept LICENSE.txt & CONTRIBUTING.txt. 

Questions, ideas, problems may actually be created as a thread in [the issues section](https://github.com/cyberblast/MaumauServer/issues). Or reach out to me per [email](mailto://git@cyberblast.org).

If you 'd like to work on the code please create a new branch, make your changes/additions and finally create a pull request to merge to dev branch. 

To create a new branch: 

1. Checkout dev and ensure it's up to date
  
  ```Shell
  git checkout dev
  git pull
  ```

2. Create a new branch locally and remote
  
  You can create a branch for a certain topic (`feature/<topic>`) (preferred) or a general branch for your work (`user/<yourGithubUserName>`) (for continuous development).

  ```Shell
  git branch user/<yourGithubUserName>
  git checkout user/<yourGithubUserName>
  git push --set-upstream origin user/<yourGithubUserName>
  ```

  After you completed your work, you can create a new pull request [here](https://github.com/cyberblast/MaumauServer/pulls).

## Prerequisites

It is recommended to use a very current version of node.js (like v10.15.2).

## Commands & Settings

To start the game server call `npm run main`. Afterwards you can access it using a browser at: http://127.0.0.1/

You can change the server port (default: 80) in `src/game.json` (prior to starting the game server).

## Roadmap

Next Steps: 

**1. Homepage UI**
  * Some basic design
  * If there is a game running already show an alternative message like "game in progress. please wait"
  * If there is a game running and the current user is a player redirect to game page (stub)
  * If there is no game running allow users to opt in to the list of players
  * Start game button to start game and lock home
  * Some JS polling if the game has started

**2. Identification**
  * No Authentication
  * Allow to enter/change a name
  * Save IP/Name Pair ([local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))
  * Maybe "My Settings"

**3. Chat**
  * Simple chat
  * Should be sticky even upon navigate (frames? js-handled navigate (ajax style)?)

**4. Game UI**
  * Cards
  * Table
  * Options
  * Poll for Updates  

**5. Game Logic**
  * Allowed cards
  * Play a card
  * Special Cards

**6. Admin Page**
  * Kill Game Session
  * Stop Server

**7. Multiple Game Sessions**
