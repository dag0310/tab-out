/** Use the Tab key to jump out of groupings after closing characters \", ', ), ] and } like in Eclipse. */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager");
    var KeyBindingManager = brackets.getModule("command/KeyBindingManager");
    var EditorManager = brackets.getModule("editor/EditorManager");

    function jumpRightIfClosingCharacter() {
        var editor = EditorManager.getFocusedEditor();

        if (editor) {
            var currentCursorPosition = editor.getCursorPos();
            var currentLinePosition = currentCursorPosition.line;
            var currentCharacterPosition = currentCursorPosition.ch;

            var nextCharacter = editor.document.getRange(
                {line: currentLinePosition, ch: currentCharacterPosition},
                {line: currentLinePosition, ch: currentCharacterPosition + 1}
            );

            var closingCharacters = ['"', '\'', ')', ']', '}'];
            if (closingCharacters.indexOf(nextCharacter) !== -1) {
                editor.setCursorPos(currentCursorPosition.line, currentCursorPosition.ch + 1);
            } else {
                editor.document.replaceRange('\t', currentCursorPosition);
            }
        }
    }

    var MY_COMMAND_ID = 'dag0310.tab-out';

    CommandManager.register("Tab Out", MY_COMMAND_ID, jumpRightIfClosingCharacter);

    KeyBindingManager.addBinding(MY_COMMAND_ID, 'Tab');
});