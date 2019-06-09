# Pepper Flash プラグインを使用する

Electron は Pepper Flash プラグインをサポートしています。Electron で Pepper Flash プラグインを使用するには、Pepper Flash プラグインの場所を手動で指定してからアプリケーションで有効にする必要があります。

## Flash プラグインのコピーを準備する

macOS と Linux では、Pepper Flash プラグインの詳細は Chrome ブラウザの中で `chrome://flash` に移動することで見つけることができます。 その場所とバージョンは、Electron の Pepper Flash サポートに役立ちます。 他の場所にコピーすることもできます。

## Electron Switch を追加する

You can directly add `--ppapi-flash-path` and `--ppapi-flash-version` to the Electron command line or by using the `app.commandLine.appendSwitch` method before the app ready event. Also, turn on `plugins` option of `BrowserWindow`.

例:

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

app.on('ready', () => {
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

You can also try loading the system wide Pepper Flash plugin instead of shipping the plugins yourself, its path can be received by calling `app.getPath('pepperFlashSystemPlugin')`.

## `<webview>` タグで Flash プラグインを有効化する

`plugins`属性を `<webview>` tagに加える。

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## トラブルシューティング

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. One way of accomplishing this, is to use [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).