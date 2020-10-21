# Depanarea aplicației

Ori de câte ori aplicarea ta Electron nu se comportă așa cum ai dorit, o serie de instrumente de depanare vă pot ajuta să găsiți erori de codificare, performanță blocaje sau oportunități de optimizare.

## Procesul de redare

Instrumentul cel mai cuprinzător pentru depanarea proceselor individuale de redare este Unelte de Dezvoltator Chromium. Este disponibil pentru toate procesele de redare, inclusiv instanţele `BrowserWindow`, `BrowserView`şi `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools][devtools]. We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Procesul principal

Depanarea procesului principal este puțin mai complicată, deoarece nu poți deschide instrumente de dezvoltare pentru ei. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
