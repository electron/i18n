# Використання Плагіну Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Підготувати копію плагіну Flash

На macOS і Linux, деталі плагіну Pepper Flash можна знайти navigating to `chrome://flash` в Chrome браузер. Її розташування і версія корисні для підтримки Electron Pepper Flash. Можна також скопіювати його до іншого розташування.

## Додати Electron перемикач

Ви можете додати безпосередньо `--ppapi-flash-path` і `--ppapi-flash-version` до командного рядка або за допомогою додатка `. метод ommandLine.appendSwitch` перед подією додатку. Також увімкніть `плагіни` опції `BrowserWindow`.

Наприклад:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Specify flash path, supposing it is placed in the same directory with main.js.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

Ви можете спробувати завантажити великий покажчик системного плагіну Pepper Flash замість доставки своїх плагінів, його шлях може бути отриманий шляхом виклику `додатком. etPath('pepperFlashSystemPlugin')`.

## Увімкнути Flash-плагін у `<webview>` тегу

Додати `плагіни` атрибут в тег `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Виправлення Неполадок

Ви можете перевірити, чи плагін Pepper Flash завантажений інспектором `навігатор. потоки` в консолі devtools (хоча ви не можете знати, якщо шлях до плагіну правильний).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Для деяких операцій, таких як потоковий медіа за допомогою RTMP, необхідно надати більш широкі дозволи гравцям `.swf` файлів. Один із способів цього досягнення, це використати [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
