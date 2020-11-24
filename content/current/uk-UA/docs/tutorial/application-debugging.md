# Налагодження додатку

Кожного разу, коли ваша програма Electron не поводяться так, як ви хотіли, масив інструментів налагодження може допомогти вам знайти помилки, продуктивність вузьких місць або оптимізаційних можливостей.

## Відтворювач

Найбільш повним інструментом для налагодження індивідуальних процесів візуалізатора Інструменти розробника Chromium. Доступно для всіх процесів рендеру, включаючи екземпляри `BrowserWindow`, `BrowserView`та `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.webContents.openDevTools()
```

Google пропонує [відмінну документацію для їх інструментів розробника](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

## Основний процес

Налагодження основного процесу є трохи хитрішим, оскільки ви не можете відкрити для них інструменти розробника. Інструменти розробника Chromium можуть використовувати [ для налагодження основного процесу Electron's](https://nodejs.org/en/docs/inspector/) завдяки тіснішій співпраці між Google / Chrome і Node. s, але ви можете зіткнутися з диваками як `вимагають` не присутній в консолі.

Для отримання додаткової інформації дивіться [налагодження документації головного Процесу](./debugging-main-process.md).

## Аварії V8

Якщо контекст V8 аварійно завершується, розробники відображатимуть це повідомлення.

`DevTools було відключено від сторінки. Після того, як сторінка буде перезавантажена, розробники автоматично перепідключаться.`

Журнали Chromium можуть бути увімкнені через змінну середовища `ELECTRON_ENABLE_LOGING`. For more information, see the [environment variables documentation](../api/environment-variables.md#electron_enable_logging).

Альтернативно можна передати аргумент командного рядка `--enable-logging`. More information is available in the [command line switches documentation](../api/command-line-switches.md#--enable-logging).
