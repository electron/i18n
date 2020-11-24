# Отладка приложений

Всякий раз, когда ваше приложение Electron не ведет себя так, как вы этого хотели, массив средств отладки может помочь вам найти ошибки в кодировании, узкие места производительности или возможности оптимизации.

## Процесс визуализации

Наиболее полным инструментом для отладки отдельных процессов рендеринга является набор инструментов разработчика Chromium. Он доступен для всех процессов рендеринга, включая экземпляры таких объектов как `BrowserWindow`, `BrowserView`, и `WebView`. Вы можете открыть их программно, вызывая API `openDevTools()` в `webContents` экземпляра:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google предлагает [отличную документацию для своих инструментов разработчика](https://developer.chrome.com/devtools). Мы рекомендуем вам ознакомиться с ними - они, как правило, являются одними из самых мощных утилит в инструментальном окружении для разработчиков Electron.

## Основной процесс

Отладка основного процесса немного сложнее, поскольку вы не можете открыть для них инструменты для разработчиков. Инструменты Chromium Developer Tools [могут использоваться для отладки основного процесса Electron](https://nodejs.org/en/docs/inspector/) благодаря более тесному сотрудничеству между Google / Chrome и Node.js, но вы можете столкнуться с такими странностями, которые вам не `нужны` в консоли.

Для получения дополнительной информации см. Документацию [Отладка основной процедуры](./debugging-main-process.md).

## V8 вылетов

При падении контекста V8 это сообщение будет отображаться в DevTools.

`DevTools был отключен от страницы. После перезагрузки страницы DevTools будет автоматически подключаться.`

Журналы Chromium могут быть включены через переменную окружения `ELECTRON_ENABLE_LOGING`. For more information, see the [environment variables documentation](../api/environment-variables.md#electron_enable_logging).

В качестве альтернативы, может быть передан аргумент командной строки `--enable-logging`. More information is available in the [command line switches documentation](../api/command-line-switches.md#--enable-logging).
