# Налагодження додатку

Кожного разу, коли ваша програма Electron не поводяться так, як ви хотіли, масив інструментів налагодження може допомогти вам знайти помилки, продуктивність вузьких місць або оптимізаційних можливостей.

## Відтворювач

Найбільш повним інструментом для налагодження індивідуальних процесів візуалізатора Інструменти розробника Chromium. Доступно для всіх процесів рендеру, включаючи екземпляри `BrowserWindow`, `BrowserView`та `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools][devtools]. We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Основний процес

Налагодження основного процесу є трохи хитрішим, оскільки ви не можете відкрити для них інструменти розробника. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
