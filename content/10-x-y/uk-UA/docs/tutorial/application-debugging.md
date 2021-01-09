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

## Аварії V8

Якщо контекст V8 аварійно завершується, розробники відображатимуть це повідомлення.

`DevTools було відключено від сторінки. Після того, як сторінка буде перезавантажена, розробники автоматично перепідключаться.`

Журнали Chromium можуть бути увімкнені через змінну середовища `ELECTRON_ENABLE_LOGING`. Для отримання додаткової інформації дивіться [змінні середовища](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Альтернативно можна передати аргумент командного рядка `--enable-logging`. More information is available in the [command line switches documentation](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
