const { app } = require('electron');

function Regedit() {

}

Regedit.progIds = []

Regedit.add = function(progid) {
    Regedit.progIds.push(progid)
}

Regedit.installAll = function() {
    Regedit.progIds.forEach(progId => progId.install())
}

Regedit.uninstallAll = function() {
    Regedit.progIds.forEach(progId => progId.uninstall())
}

Regedit.squirrelStartupEvent = function() {
    if (process.platform !== 'win32') {
        return false;
    }

    var squirrelCommand = process.argv[1];
    switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
            Regedit.installAll()
            app.quit();
            return true;
        case '--squirrel-uninstall':
            Regedit.uninstallAll()
            app.quit();
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
    }
}

module.exports = Regedit