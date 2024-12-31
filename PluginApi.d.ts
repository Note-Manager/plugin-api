export interface EditorPlugin {
    /**
     * Display name of your plugin. This will be displayed under 'Installed Plugins' menu and under 'Plugins' top menu.
     */
    name: string,

    /**
     * This is not supported yet, but once it is implemented, you can provide this array to add items to editors right-click menu.
     */
    contextMenuItems?: Array<EditorMenuItem>,

    /**
     * Menu items that will be displayed under your plugin's name at the 'Plugin' top menu.
     */
    applicationMenuItems?: Array<EditorMenuItem>,

    /**
     * Menu items that will be displayed at the toolbar (right bar). This menu items has to provide the tool window content (HTML) that will be displayed when the related tool window is opened.
     */
    toolbarMenuItems?: Array<ToolbarMenuItem>,

    /**
     * This will be called whenever the editor is initialized (e.g. on every tab change).
     * Since the calling frequency of this function is fully depends on the user, it's plugin developer's responsibility to avoid unnecessary re-initializations that will slow down the application.
     * @param editor
     */
    initializePlugin: (editor: EditorWrapper) => void,

    /**
     * Return all action code that your plugin will listen to. This action codes will be sent to 'doAction' method when it needs to be executed.
     */
    getAvailableActions: () => Array<string>,

    /**
     * This will be called whenever user is performed your plugin's menu item via mouse click or keyboard shortcut.
     * @param code: The code that you provided in 'applicationMenuItems'
     */
    doAction: (code: string) => void,
}

export interface EditorMenuItem {
    /**
     * Label to show as the wrapper menu
     */
    label: string,

    /**
     * Actions that will be placed under submenu of this label
     */
    actions: Array<EditorAction>
}

export interface EditorAction {
    /**
     * Display name.
     */
    label: string,

    /**
     * Action code.
     */
    code: string,

    /**
     * Action hook.
     * @param editor
     */
    perform?: (editor: EditorWrapper) => void

    /**
     * Keyboard shortcut in electron format. (example: CmdOrCtrl+Shift+F, Ctrl+F, Alt+R)
     */
    accelerator?: string,
}

/**
 * Tool windows.
 */
export interface ToolbarMenuItem {
    /**
     * Display name.
     */
    label: string,

    /**
     * Icon (base64 url).
     */
    icon: string,

    /**
     * Hook to call whenever the related tool window is opened.
     * @param parent
     */
    onContentMount?: (parent: ShadowRoot) => void,

    /**
     * HTML content to render in tool window.
     */
    getToolbarWindowContent: () => string
}

export interface EditorWrapper {
    /**
     * Returns the selection range in a single cursor editor.
     */
    getSingleSelectionRange: () => any;

    /**
     * Returns the array of selection ranges in a multi cursor editor.
     */
    getAllSelectionRanges: () => Array<any>;

    /**
     * Replaces single cursor selection with given text.
     * @param text
     */
    replaceSelection: (text: string) => void,

    /**
     * Replaces the content in the given range with provided string.
     * @param range: Range to replace
     * @param text
     */
    replaceRange: (range: any, text: string) => void,

    /**
     * Replaces the contents of each selection range with the given string. Supports both single cursor and multiple cursors.
     * @param text: Text to replace selections with
     */
    replaceAllSelectionRanges: (text: string) => void

    /**
     * Returns the selected text. If the editor is in multi cursor mode, returns the concatenation of the all selections.
     */
    getSelectedText: () => string;

    /**
     * Returns the language mode of the editor.
     */
    getLanguage: () => string;

    /**
     * Returns the text that is included by the given range.
     * @param range: Range to search
     */
    getTextRange: (range: any) => string;

    /**
     * Returns the current value of the editor.
     */
    getValue: () => string;
}