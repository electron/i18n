# Pepper Flash プラグインを使用する

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Flash プラグインのコピーを準備する

macOS と Linux では、Pepper Flash プラグインの詳細は Chrome ブラウザの中で `chrome://flash` に移動することで見つけることができます。 その場所とバージョンは、Electron の Pepper Flash サポートに役立ちます。 他の場所にコピーすることもできます。

## Electron Switch を追加する

Electron のコマンドラインに直接 `--ppapi-flash-path` と `--ppapi-flash-version` を追加するか、app の ready イベントより前に `app.commandLine.appendSwitch` メソッドを使用できます。 更に、`BrowserWindow` の `plugins` オプションを有効にしてください。

例:

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// main.js と同じディレクトリにあると仮定して、Flash のパスを指定します。
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

// 任意: Flash のバージョンを指定します。v17.0.0.169 であればこのようにします。
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
  // 他のすること
})
```

プラグインを自分で同梱する代わりに、システム側の Pepper Flash プラグインをロードしてみることもできます。そのパスは、`app.getPath('pepperFlashSystemPlugin')` を呼び出すことで取得できます。

## `<webview>` タグで Flash プラグインを有効化する

`plugins` 属性を `<webview>` tagに加えます。

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## トラブルシューティング

Pepper Flash プラグインがロードされているかどうかを確認するには、デベロッパー ツールのコンソール内で `navigator.plugins` を調べます (ただしそのプラグインのパスが正しいかどうかはわかりません)。

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

RTMP を使用したメディアのストリーミングのような、いくつかの操作では、Flash Player の `.swf` ファイルに対してより広範な権限を付与する必要があります。 これを実現する方法の 1 つは、[nw-flash-trust](https://github.com/szwacz/nw-flash-trust) を使用することです。
