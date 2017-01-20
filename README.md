# electron-regedit
File associations, file icons &amp; open with... for electron apps

This module allow you to register your app in the windows registry, manipulate context menus & handle native open, edit, print, preview actions ect.

## Installation
```shell
npm install electron-regedit
```

## Documentation
### Toy Example
As a short documentation, here is how the module is used:
```javascript
const {ProgId, ShellOption, Regedit} = require('electron-regedit')

new ProgId({
    appName: 'My App',
    description: 'My App File',
    friendlyAppName: 'My App Alias',
    icon: 'myicon.ico',
    extensions: ['myapp'],
    shell: [
        new ShellOption({verb: ShellOption.OPEN}),
        new ShellOption({verb: ShellOption.EDIT}),
        new ShellOption({verb: ShellOption.PRINT})
    ]
})

Regedit.installAll()
```

### Squirrel integration
You will need to call ```Regedit.installAll()``` and ```Regedit.uninstallAll()``` when installing/uninstalling your application to clean up the registry. If you are using Squirrel there is a helping function to handle this 
```javascript
const {Regedit} = require('electron-regedit')

if (Regedit.squirrelStartupEvent()) return

//... the rest of your application code
```
