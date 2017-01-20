const { app } = require('electron');
const Q = require('q')

function Regedit() {

}

Regedit.progIds = []

Regedit.add = function(progid) {
    Regedit.progIds.push(progid)
}

Regedit.installAll = function() {
    return Q.all(Regedit.progIds.map(progId => progId.install()))
}

Regedit.uninstallAll = function() {
    return Q.all(Regedit.progIds.map(progId => progId.uninstall()))
}

Regedit.squirrelStartupEvent = function() {
    if (process.platform !== 'win32') {
        return false;
    }

    var squirrelCommand = process.argv[1];
    switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
            Regedit.installAll().finally(() => app.quit())
            return true;
        case '--squirrel-uninstall':
            Regedit.uninstallAll().finally(() => app.quit())
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
    }
}

module.exports = Regedit