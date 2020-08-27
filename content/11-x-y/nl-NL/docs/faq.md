# Electron FAQ

## Waarom ondervind ik problemen met het installeren van Electron?

Bij het uitvoeren van `npm install electron`, krijgen sommige mensen een error.

In bijna alle gevallen zijn de fouten het resultaat van een netwerk probleem en niet een probleem met de `electron` npm package. Errors zoals `ELIFECYCLE` `EAI_AGAIN`, `ECONNRESET` en `ETIMEDOUT` zijn indicaties van dergelijke netwerkproblemen. De beste oplossing is om te proberen de netwerkverbinding te wijzigen of even te wachten en de installatie opnieuw uit te voeren.

Je kunt ook Electron direct hieronder proberen [electron/electron/releases](https://github.com/electron/electron/releases) te downloaden als de installatie via `npm` blijft mislukken.

## Wanneer wordt Electron geüpgraded naar de nieuwste versie van Chrome?

De Chrome-versie van Electron wordt meestal binnen een week of twee later geïmplementeerd nadat er een nieuwe stabiele versie voor Chrome is uitgebracht. Deze schatting is niet gegarandeerd en hangt af van de hoeveelheid werk die gemoeid is met upgraden.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Raadpleeg de [beveiligingsintroductie](tutorial/security.md) voor meer informatie.

## Wanneer word Electron geüpgrade worden naar de laatste Node.js?

Zodra een nieuwe versie van Node.js uitgebracht word, wachten wij ongeveer een maand voordat wij upgraden. Op die manier kunnen wij voorkomen dat bugs ons beïnvloeden.

Nieuwe functionaliteiten van Node.js worden meestal mogelijk gemaakt door V8-upgrades. Aangezien Electron de met Chrome-browser meegeleverde V8 gebruikt, moet u de nieuwe JavaScript-functies gebruiken De nieuwe Node.js-versie is meestal al beschikbaar in Electron.

## Data delen tussen webpagina's.

Om data te delen tussen webpagina's (de rendere processes) is het het gemakkelijkst om de HTML5 APIs te gebruiken die al beschikbaar zijn in browsers. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`][message-port] from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## My app's tray disappeared after a few minutes.

This happens when the variable which is used to store the tray gets garbage collected.

Wanneer je dit probleem tegenkomt, zullen de volgende artikelen misschien van pas komen:

* [Geheugenbeheer][memory-management]
* [Variabel bereik][variable-scope]

Als je een snelle oplossing zoekt, kun je de variabelen globaal maken door de code te veranderen naar het volgende:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

naar dit:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Ik kan geen jQuery/RequireJS/Meteor/AngularJS gebruiken in Electron.

Vanwege de Node.js integratie van Electron zijn er een aantal extra symbolen aan de DOM toegevoegd, zoals `module`, `exports` en `require`. Dit kan problemen veroorzaken voor sommige bibliotheken omdat ze symbolen met dezelfde namen willen toevoegen.

To solve this, you can turn off node integration in Electron:

```javascript
// In het main proces.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Maar als je de mogelijkheden wilt behouden om Node.js en Electron API's te gebruiken, moet je de symbolen in de pagina hernoemen voordat je andere bibliotheken kunt opnemen:

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

It is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.

## The font looks blurry, what is this and what can I do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Voorbeeld:

![subpixel rendering example][]

Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) for more info).

To achieve this goal, set the background in the constructor for [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Notice that just setting the background in the CSS does not have the desired effect.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[browser-window]: api/browser-window.md
[subpixel rendering example]: images/subpixel-rendering-screenshot.gif
