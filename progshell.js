const Registry = require('winreg')
const path = require('path')
const {app} = require('electron')

const {$create, $set} = require('./util')

function ProgShell({
    verb = 'open',
    action = undefined,
    icon = undefined,
    command = `"${process.execPath}" "%1"`
}) {
    this.verb = verb,
    this.action = action,
    this.icon = icon,
    this.command = command
}

ProgShell.OPEN = 'open'
ProgShell.EDIT = 'edit'
ProgShell.PREVIEW = 'preview'

ProgShell.prototype.bindProg = function (progid) {
    this.progid = progid
    return this
};

ProgShell.prototype.install = function () {
    if (!this.progid) {
        throw new Error('ProgShell must be part of a ProgId')
        return
    }

    let self = this

    let registry = new Registry({
        hive: this.progid.hive,
        key: `${this.progid.BASE_KEY}\\shell\\${this.verb}\\command`
    })

    return $create(registry)
        .then(() => registerCommand(registry))
        .then(() => registerAction(registry.parent))
        .then(() => registerIcon(registry.parent))


    function registerCommand(registry) {
        console.log('Register command');
        return $set(registry, Registry.DEFAULT_VALUE, Registry.REG_SZ, self.command)
    }

    function registerAction(registry) {
        console.log('Register action');

        if (self.action === undefined && self.verb === 'open') {
            self.action = `Open with ${self.progid.appName}`
        }

        if (!self.action) return

        return $set(registry, Registry.DEFAULT_VALUE, Registry.REG_SZ, self.action)
    }

    function registerIcon(registry) {
        if (!self.icon) return

        return $set(registry, 'Icon', Registry.REG_SZ, self.icon)
    }
};

module.exports = ProgShell