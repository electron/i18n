# Electron FAQ

## Waarom ondervind ik problemen met het installeren van Electron?

Bij het uitvoeren van `npm install electron`, krijgen sommige mensen een error.

In bijna alle gevallen zijn de fouten het resultaat van een netwerk probleem en niet een probleem met de `electron` npm package. Errors zoals `ELIFECYCLE` `EAI_AGAIN`, `ECONNRESET` en `ETIMEDOUT` zijn indicaties van dergelijke netwerkproblemen. De beste oplossing is om te proberen de netwerkverbinding te wijzigen of even te wachten en de installatie opnieuw uit te voeren.

Je kunt ook Electron direct hieronder proberen [electron/electron/releases](https://github.com/electron/electron/releases) te downloaden als de installatie via `npm` blijft mislukken.

## Wanneer wordt Electron geüpgraded naar de nieuwste versie van Chrome?

De Chrome-versie van Electron wordt meestal binnen een week of twee later geïmplementeerd nadat er een nieuwe stabiele versie voor Chrome is uitgebracht. Deze schatting is niet gegarandeerd en hangt af van de hoeveelheid werk die gemoeid is met upgraden.

Alleen het stabiele kanaal van Chrome wordt gebruikt. Als een belangrijke oplossing in de beta of dev kanaal, zullen we het backporten.

Raadpleeg de [beveiligingsintroductie](tutorial/security.md) voor meer informatie.

## Wanneer word Electron geüpgrade worden naar de laatste Node.js?

Zodra een nieuwe versie van Node.js uitgebracht word, wachten wij ongeveer een maand voordat wij upgraden. Op die manier kunnen wij voorkomen dat bugs ons beïnvloeden.

Nieuwe functionaliteiten van Node.js worden meestal mogelijk gemaakt door V8-upgrades. Aangezien Electron de met Chrome-browser meegeleverde V8 gebruikt, moet u de nieuwe JavaScript-functies gebruiken De nieuwe Node.js-versie is meestal al beschikbaar in Electron.

## Data delen tussen webpagina's.

Om data te delen tussen webpagina's (de rendere processes) is het het gemakkelijkst om de HTML5 APIs te gebruiken die al beschikbaar zijn in browsers. Goede kandidaten zijn [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`LocalStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) en [`SessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Or you can use the IPC system, which is specific to Electron, to store objects in the main process as a global variable, and then to access them from the renderers through the `remote` property of `electron` module:

```javascript
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets garbage collected.

Wanneer je dit probleem tegenkomt, zullen de volgende artikelen misschien van pas komen:

* [Geheugenbeheer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

naar dit:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
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

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.