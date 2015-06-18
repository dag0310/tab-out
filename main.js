/** Use the Tab key to leave closing characters ", ', ), ], }, > like in Eclipse. */
define(function (require, exports, module) {
    'use strict';
    
    var EXTENSION_NAME = 'dag0310.tab-out';
    var TAB_OUT_COMMAND = EXTENSION_NAME + '.tab-out';
    var TOGGLE_COMMAND = EXTENSION_NAME + '.toggle';
    var DEFAULT_KEY_BINDING = 'Tab';
    var ALT_KEY_BINDING = 'Alt-Tab';
    var ALT_KEY_BINDING_ENABLED_PREFERENCE = 'altKeyEnabled'
    
    var CommandManager = brackets.getModule('command/CommandManager');
    var KeyBindingManager = brackets.getModule('command/KeyBindingManager');
    var EditorManager = brackets.getModule('editor/EditorManager');
    var Menus = brackets.getModule('command/Menus');
    var PreferencesManager = brackets.getModule('preferences/PreferencesManager');
    
    var _prefs = PreferencesManager.getExtensionPrefs(EXTENSION_NAME);
    _prefs.definePreference(ALT_KEY_BINDING_ENABLED_PREFERENCE, 'boolean', false);
    
    function tabOutIfPossible() {
        var editor = EditorManager.getFocusedEditor();
        if (! editor)
            return true;
        
        var currentCursorPosition = editor.getCursorPos();
        var nextCursorPosition = {line: currentCursorPosition.line, ch: currentCursorPosition.ch + 1}
        
        if (editor.getSelectedText() !== '')
            return true;
        
        var nextCharacter = editor.document.getRange(currentCursorPosition, nextCursorPosition);
        var closingCharacters = ['"', "'", ')', ']', '}', '>'];
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
    
    function setKeyBinding(isAlternative) {
        if (isAlternative && brackets.platform === 'mac') {
            KeyBindingManager.removeBinding(DEFAULT_KEY_BINDING);
            KeyBindingManager.addBinding(TAB_OUT_COMMAND, ALT_KEY_BINDING, 'mac');
        } else {
            KeyBindingManager.removeBinding(ALT_KEY_BINDING);
            KeyBindingManager.addBinding(TAB_OUT_COMMAND, DEFAULT_KEY_BINDING);
        }
    }
    
    function toggleKeyBinding() {
        _prefs.set(ALT_KEY_BINDING_ENABLED_PREFERENCE, ! _prefs.get(ALT_KEY_BINDING_ENABLED_PREFERENCE));
        _prefs.save();
        
        CommandManager.get(TOGGLE_COMMAND).setChecked(_prefs.get(ALT_KEY_BINDING_ENABLED_PREFERENCE));
        
        setKeyBinding(_prefs.get(ALT_KEY_BINDING_ENABLED_PREFERENCE));
        
        brackets.getModule('widgets/Dialogs').showModalDialog('', 'Please restart Brackets', "Tab Out's and other plugins' affected keyboard shortcuts fully functional after restart of Brackets!");
    }
    
    CommandManager.registerInternal(TAB_OUT_COMMAND, tabOutIfPossible);
    setKeyBinding(_prefs.get(ALT_KEY_BINDING_ENABLED_PREFERENCE));
    
    if (brackets.platform === 'mac') {
        CommandManager.register('Tab Out: Use ' + ALT_KEY_BINDING.replace('-', '+') + ' instead of ' + DEFAULT_KEY_BINDING + ' (Mac only)', TOGGLE_COMMAND, toggleKeyBinding);
        var menu = Menus.getMenu(Menus.AppMenuBar.NAVIGATE_MENU);
        menu.addMenuItem(TOGGLE_COMMAND);
        CommandManager.get(TOGGLE_COMMAND).setChecked(_prefs.get(ALT_KEY_BINDING_ENABLED_PREFERENCE));
    }
});
