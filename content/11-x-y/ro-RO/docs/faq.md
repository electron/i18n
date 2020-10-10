# Întrebări și răspunsuri Electron

## De ce am probleme cu instalarea lui Electron?

Când rulezi `npm install electron</ 0>, unii utilizatori întâlnesc ocazional erori de instalare.</p>

<p spaces-before="0">Când rulezi <code>npm instalează electroni`, unii utilizatori întâlnesc ocazional erori de instalare. Errori ca `ELIFECYCLE`,`EAI_AGAIN`, `ECONNRESET`, si `ETIMEDOUT` sunt indicatii ca exista probleme de retea. Cea mai bună rezoluție este să încercați să schimbați rețelele, sau să așteptați puțin și să instalați din nou.

Puteți încerca să descărcați Electron direct de pe [electron/electron/releases](https://github.com/electron/electron/releases) dacă instalarea via `npm` eșuează.

## Când va face upgrade Electron la cel mai recent Chrome?

The Chrome version of Electron is usually bumped within one or two weeks after a new stable Chrome version gets released. Această estimare nu este garantată și depinde de volumul de muncă implicat în modernizare.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Pentru mai multe informații, vă rugăm să consultați [introducerea de securitate](tutorial/security.md).

## Când va trece Electron la ultimul Node.js?

Atunci când o versiune nouă a Node.js este lansată, așteptăm de obicei aproximativ o lună înainte de a-l moderniza pe cel din Electron. Așa că putem evita să fim afectați de bug-uri introduși în versiunile noi de Node.js, ceea ce se întâmplă foarte des.

Noile caracteristici ale Node.js sunt, de obicei, aduse de upgrade-urile V8, deoarece Electron folosește V8-ul adus de browserul Chrome, nou-nouța caracteristică JavaScript a unei versiuni noi Node.js este, de obicei, deja în Electron.

## Cum se partajează datele între paginile web?

Pentru a partaja date între pagini web (procesele de redare), cea mai ușoară cale este de a utiliza API-urile HTML5 care sunt deja disponibile în browsere. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`][message-port] from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## My app's tray disappeared after a few minutes.

This happens when the variable which is used to store the tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management][memory-management]
* [Variable Scope][variable-scope]

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// În procesul principal-main.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
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

It is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.

## The font looks blurry, what is this and what can I do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Exemplu:

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
