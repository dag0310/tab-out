# Tab Out
[Brackets](http://brackets.io) extension which allows you to use the Tab key to skip any character.

**WARNING**: Does not work together with other plugins which make use of the Tab key (e.g. Emmet). You could re-map the key binding of the other plugin though. Or -- if you have a Mac -- you can change the key binding to Alt+Tab under "Navigation".

## Installation
Please use the Brackets Extension Manager to install this plugin.

## Usage
Press the Tab key to move your cursor one position to the right when you want to skip a character.

## Visual explanation
| = text cursor

* Use the force:
  
  `var x = "test|"`
  
  *Tab key*
  
  `var x = "test"|`


* Indent if there is just whitespace to the left of the cursor instead of jumping outside (. = whitespace):

  `....|}`
  
  *Tab key*
  
  `........|}`
