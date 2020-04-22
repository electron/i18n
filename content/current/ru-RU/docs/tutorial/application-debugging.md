# Отладка приложений

Всякий раз, когда ваше приложение Electron не ведет себя так, как вы этого хотели, массив средств отладки может помочь вам найти ошибки в кодировании, узкие места производительности или возможности оптимизации.

## Процесс визуализации

Наиболее полным инструментом для отладки отдельных процессов рендеринга является набор инструментов разработчика Chromium. Он доступен для всех процессов рендеринга, включая экземпляры таких объектов как `BrowserWindow`, `BrowserView`, и `WebView`. Вы можете открыть их программно, вызывая API `openDevTools()` в `webContents` экземпляра:

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google предлагает [отличную документацию для своих инструментов разработчика](https://developer.chrome.com/devtools). Мы рекомендуем вам ознакомиться с ними - они, как правило, являются одними из самых мощных утилит в инструментальном окружении для разработчиков Electron.

## Основной процесс

Отладка основного процесса немного сложнее, поскольку вы не можете открыть для них инструменты для разработчиков. Инструменты Chromium Developer Tools [могут использоваться для отладки основного процесса Electron](https://nodejs.org/en/docs/inspector/) благодаря более тесному сотрудничеству между Google / Chrome и Node.js, но вы можете столкнуться с такими странностями, которые вам не `нужны` в консоли.

Для получения дополнительной информации см. Документацию [Отладка основной процедуры](./debugging-main-process.md).

## V8 Crashes

If the V8 context crashes, the DevTools will display this message.

`DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`

Chromium logs can be enabled via the `ELECTRON_ENABLE_LOGGING` environment variable. For more information, see the [environment variables documentation](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Alternatively, the command line argument `--enable-logging` can be passed. More information is available in the [command line switches documentation](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).
