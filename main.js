/** Use the Tab key to jump out of groupings after closing characters ", ', ), ] and } like in Eclipse. */
define(function (require, exports, module) {
    'use strict';

    var CommandManager = brackets.getModule('command/CommandManager');
    var KeyBindingManager = brackets.getModule('command/KeyBindingManager');
    var EditorManager = brackets.getModule('editor/EditorManager');

    function tabOutIfPossible() {
        var editor = EditorManager.getFocusedEditor();
        if (! editor)
            return;

        var currentCursorPosition = editor.getCursorPos();
        var nextCursorPosition = {line: currentCursorPosition.line, ch: currentCursorPosition.ch + 1}

        var nextCharacter = editor.document.getRange(currentCursorPosition, nextCursorPosition);
        var closingCharacters = ['"', "'", ')', ']', '}'];
        var nextCharacterIsNotClosingCharacter = closingCharacters.indexOf(nextCharacter) === -1;
        if (nextCharacterIsNotClosingCharacter)
            return true;

        var beginningOfLinePosition = {line: currentCursorPosition.line, ch: 0};
        var textInLineBeforeCursor = editor.document.getRange(beginningOfLinePosition, currentCursorPosition);
        var hasOnlyWhitespaceToTheLeft = textInLineBeforeCursor.trim() === '';
        if (hasOnlyWhitespaceToTheLeft)
            return true;

        editor.setCursorPos(nextCursorPosition);

        return false;
    }

    var MY_COMMAND_ID = 'dag0310.tab-out';

    CommandManager.register('Tab Out', MY_COMMAND_ID, tabOutIfPossible);

    KeyBindingManager.addBinding(MY_COMMAND_ID, 'Tab');
});
