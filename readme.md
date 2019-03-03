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

## HELP WANTED! 

My current setup:  
Windows, vscode, node 10.15.2  
No additional global or local modules

Issues so far:

I can't seem to get esnext working correctly. It is running that far, but I keep getting vscode Typescript compiler warnings. Mainly due to usage of private class fields with a leading hash-sign:
```JavaScript
class Card {
  #_color;
  #_value;
}
```

Also template strings / string interpolation don't work at all. I simply don't get it why that is! 

**ANY HINT IS HIGHLY APPRECIATED!**

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
  * Save IP/Name Pair ([local storage(https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))
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
