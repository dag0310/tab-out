# Tab Out
[Brackets](http://brackets.io) extension which allows the user to use the Tab key to jump out of groupings after closing characters ", ', ), ] and } like in Eclipse.

# Advantage
Try to type the following JavaScript line in Brackets and use the Tab key to leave the strings, objects and array:

`var test = [{'key1': "value1", 'key2': "value2"}];`

WARNING: You may find this more fun to type than having to reach for the right arrow key or pressing the corresponding characters like you are playing a game for 3-year-olds ;-)

# Implementation details
| = text cursor

* Use the force:
  
  `var x = "test|"`
  
  *Tab key*
  
  `var x = "test"|`


* Indent if there is just whitespace to the left of the cursor instead of jumping outside (. = whitespace):

  `....|}`
  
  *Tab key*
  
  `........|}`

# License
MIT