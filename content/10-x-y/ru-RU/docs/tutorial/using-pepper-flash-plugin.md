# Использование плагина Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Подготовить копию плагина Flash

В macOS и Linux детали плагина Pepper Flash можно найти перейдя к `chrome://flash` в браузере Chrome. Его местоположение и версия полезны для поддержки Pepper Flash Electron. Вы также можете скопировать его в другое место .

## Добавить Electron Switch

Вы можете напрямую добавить `--ppapi-flash-path` и `--ppapi-flash-версии` в командную строку Electron или используя приложение `. ommandLine.appendSwitch` метод перед подготовкой события. Также включите опцию `плагинов` для `BrowserWindow`.

Например:

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

Вы также можете попробовать загрузить системный плагин Pepper Flash вместо доставки плагинов самостоятельно, его путь может быть получен по вызову `приложения. etPath('pepperFlashSystemPlugin')`.

## Включить Flash плагин в `<webview>` тег

Добавить атрибут `плагинов` к `<webview>` тег.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Устранение проблем

Вы можете проверить, загружен ли плагин Pepper Flash, проверяя `навигатора. lugins` в консоли devtools (хотя вы не можете знать, правильно ли путь к плагину ).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

В Windows путь, переданный `--ppapi-flash-path` должен использовать `\` в качестве разделителя , используя пути POSIX-стиля, не будет работать.

Для некоторых операций, таких как потоковое медиа с использованием RTMP, необходимо предоставить более широкие права доступа для файлов `.swf`. Одним из способов достижения этого является использование [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
