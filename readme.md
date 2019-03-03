# Maumau Server

State: Incomplete  
Priority: Low  
Perspective: Unclear

This is a project I mainly like to work at when I like to do something but actually don't know what. There is no deadline or any need to complete this.

Goal: Develop a fully playable [Maumau](https://en.wikipedia.org/wiki/Mau-Mau_(card_game)) card game

Way: I'd like to develop a mostly native node server. That means - I Don't like to use existing modules/packages/extensions as far as possible and reasonable (if that word is applicable at all). 
I'd also like to use esnext JS as far as possible. 

Detailed Status: 
* Web Server: Initial implementation complete, including a custom router allowing to redirect to files (UI) or module functions (API).
* Game: Implemented some general card classes & controllers, but not much yet!
* UI: 0%
* API: 0%

## HELP WANTED! 

My current setup: 
Windows, vscode, node 10.15.2
No additional global or local modules

Issues so far:

I can't seem to get it working correctly. It is running that far, but I keep getting vscode Typescript compiler warnings. Mainly due to usage of private class fields with a leading hash-sign:
```JavaScript
class Card {
  #_color;
  #_value;
}
```

Also template strings / string interpolation don't work at all. I simply don't get it why that is! 

ANY HINT IS HIGHLY APPRECIATED!
