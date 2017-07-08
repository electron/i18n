# Electron FAQ

## Wann wird Electron auf die neueste Chrome Version aktualisieren?

The Chrome version of Electron is usually bumped within one or two weeks after a new stable Chrome version gets released. This estimate is not guaranteed and depends on the amount of work involved with upgrading.

Nur der stabile Channel von Chrome wird verwendet. Wenn ein wichtiger Fix im Beta- oder Dev-Channel ist, werden wir es zurückporten.

Weitere Informationen finden Sie in der [Einführung zur Sicherheit](tutorial/security.md).

## Wann wird Electron auf die neueste Node.js Version aktualisieren?

Wenn eine neue Version von Node.js veröffentlicht wird, warten wir in der Regel etwa einen Monat vor dem Upgrade in Elektron. So können wir vermeiden, die häufigen Bugs in neuen Node.js Versionen mit in Electron einzubinden.

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## Gewusst wie: Teilen von Daten zwischen Webseiten?

Um Daten zwischen Web-Seiten (Renderer-Prozesse) zu teilen, ist der einfachste Weg, HTML5-APIs zu verwenden, die bereits in Browsern zur Verfügung stehen. Gute Kandidaten sind [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) und [`SessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Oder Sie können das IPC-System verwenden, welches speziell für Electron ist, um Objekte in den Hauptprozess als eine globale Variable zu speichern und dann vom Renderer über die `remote`-Eigenschaft des `Elektrons` Moduls darauf zugreifen:

```javascript
// Im Main-Prozess.
global.sharedObject = {  
 someProperty: 'default value'
}
```

```javascript
// In Seite 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In Seite 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Mein App Fenster/Brett verschwand nach ein paar Minuten.

Dies geschieht, wenn die Variable, die verwendet wird, um das Fenster/Fach zu speichern, nur Unsinn aufnimmt.

Wenn dieses Problem auftritt, könnten die folgenden Artikel hilfreich sein:

* [Speicherverwaltung](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Geltungsbereich von Variablen](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Wenn Sie eine schnelle Lösung bevorzugen, machen Sie die Variablen global, indem Sie Ihren Code

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
 const tray = new Tray('/path/to/icon.png')
 tray.setTitle('hello world') 
})
```

wie folgt anpassen:

```javascript
const {app, Tray} = require('electron') 
let tray = null
app.on('ready', () => {
 tray = new Tray('/path/to/icon.png')
 tray.setTitle('hello world')
})
```

## Ich kann jQuery/RequireJS/Meteor/AngularJS in Electron nicht verwenden.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.