# Отладка приложений

Всякий раз, когда ваше приложение Electron не ведет себя так, как вы этого хотели, массив средств отладки может помочь вам найти ошибки в кодировании, узкие места производительности или возможности оптимизации.

## Процесс визуализации

Наиболее полным инструментом для отладки отдельных процессов рендеринга является набор инструментов разработчика Chromium. It is available for all renderer processes, including instances of `BrowserWindow`, `BrowserView`, and `WebView`. Вы можете открыть их программно, вызывая API `openDevTools()` в `webContents` экземпляра:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google предлагает [отличную документацию для своих инструментов разработчика](https://developer.chrome.com/devtools). Мы рекомендуем вам ознакомиться с ними - они, как правило, являются одними из самых мощных утилит в инструментальном окружении для разработчиков Electron.

## Основной процесс

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](./debugging-main-process.md).