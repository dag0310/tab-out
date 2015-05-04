# Tab Out
[Brackets](http://brackets.io) extension which allows the user to use the Tab key to jump out of groupings after closing characters ", ', ), ] and } like in Eclipse.

WARNING: Does not work together with other plugins which make use of the Tab key (e.g. Emmet). You could re-map the key binding of the other plugin though.

# Usage
After installing the plugin, try typing the following JavaScript line in Brackets and use the Tab key to leave the strings, objects and array definitions:

`var test = [{'key1': "value1", 'key2': "value2"}];`

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
