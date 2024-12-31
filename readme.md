# Note Manager Plugin API
Note Manager Plugin API is distributed by a standalone file that will provide <b>only interfaces</b> for plugin developers that will provide the implementations.
You can use `PluginApi.d.ts` file to develop your plugins. This file contains the interfaces anything related to note manager app like menu items, toolbar items, editor actions etc...
Since all the plugin files will be type-checked at runtime, all plugins should have a `main.ts` file that exports a single implementation of `EditorPlugin` with name of `Main`.

## Features
For editor operations, plugin api will provide you an interface `EditorWrapper` that has methods like:
- Replace all selection ranges (multi cursor or single cursor) with given text
- Get all selection ranges
- Get the current content
- Get the text that is contained by given range
- Get the selected language (XML, HTML, ...)

Your plugin should have a void `initializePlugin` function that takes `EditorWrapper` as argument. This will be called whenever an editor is initialized in the application (e.g. tab change). Since the calling frequency of this function is fully depends on the user, it is plugin developer's responsibility to avoid unnecessary re-initializations that will slow down the application.

Example plugin implementation is below:

```ts
import {EditorPlugin, EditorWrapper} from "./PluginApi";

class YourPlugin implements EditorPlugin {
    editor?: EditorWrapper
    name: string = "Display Name Of Your Plugin";
    contextMenuItems: Array<EditorMenuItem> = []
    applicationMenuItems: Array<EditorMenuItem> = [
        {
            label: "Operations Group Title",
            actions: [
                {
                    label: "Operation 1 Label",
                    code: "op1Code",
                    accelerator: "Keyboard shortcut in electron format" // example: CmdOrCtrl+Alt+Shift+E, Ctrl+F
                },
                {
                    label: "Operation 2 Label",
                    code: "op2Code",
                    accelerator: "CmdOrCtrl+Alt+Shift+D"
                }
            ]
        }
    ];
    
    initializePlugin(editor: EditorWrapper): void {
        this._editor = editor;
        
        //... your initialization code
    }
    
    doAction(code: string): void {
        if(!this.editor) throw new Error("Plugin not initialized !");
        if(!code || !yourPluginSupportsThisCode) throw new Error(`Unsupported operation ! (${code})`);

        if(code === "op1Code") {
            // perform operation 1
        }
        // other operations...
    }
    
    getAvailableActions(): Array<string> {
        return ["op1Code", "op2Code"];
    }
}
```

Finally, put this implementation in your 'main.ts' file and your plugin will be all-set and ready to load.